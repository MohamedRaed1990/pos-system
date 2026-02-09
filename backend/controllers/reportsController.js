import Invoice from '../models/Invoice.js'

export const dailyReport = async(req , res )=>{
    const start = new Date();
    start.setHours(0,0,0,0);

    const end = new Date();
    end.setHours(23,59,59,999);

    const invoices = await Invoice.find({
        createdAt: { $gte: start, $lte: end }
    })
    const totalSales = invoices.reduce((acc,inv)=>acc+inv.finalTotal,0)
    res.json({
        date:start,
        totalSales,
        count:invoices.length
    })

}

// export const rangeReport = async( req , res )=>{
//     const {start , end} = req.body
//     const invoices = await Invoice.find({
//         createdAt:{$gte:new Date(start),$lte:new Date(end)}
//     })
//     const total = invoices.reduce((acc,i)=>acc+i.finalTotal,0)
//     res.json({invoices,total})
// }

export const rangeReport = async (req, res) => {
    try {
        let { start, end } = req.body;

        // إذا لم يتم إرسال تواريخ، اجعل النطاق هو الأسبوع الأخير افتراضياً
        if (!start || !end) {
            const today = new Date();
            const lastWeek = new Date();
            lastWeek.setDate(today.getDate() - 7);
            
            start = lastWeek;
            end = today;
        }

        const invoices = await Invoice.find({
            createdAt: { 
                $gte: new Date(start), 
                $lte: new Date(end) 
            }
        });

        const total = invoices.reduce((acc, i) => acc + i.finalTotal, 0);

        // تنسيق البيانات للرسم البياني (هام جداً للفرونت إند)
        // سنقوم بتجميع المبيعات حسب اليوم لكي يظهر الخط في Recharts
        const chartData = invoices.reduce((acc, inv) => {
            const day = new Date(inv.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
            const existing = acc.find(d => d.day === day);
            if (existing) {
                existing.sales += inv.finalTotal;
            } else {
                acc.push({ day, sales: inv.finalTotal });
            }
            return acc;
        }, []);

        // نرسل الـ invoices والـ total والـ chartData المنظمة
        res.json({ invoices, total, chartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const topProducts = async(req,res)=>{
     try {
    const data = await Invoice.aggregate([
        {$unwind:"$items"},
        {
        $lookup: {
          from: "products",           
          localField: "items.productId",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
        {$group:{_id:"$product.name",sold:{$sum:"$items.qty"}}},
        {$sort:{sold:-1}},
        {$limit:10},
        {
        $project: {
          _id: 0,            
          name: "$_id",      
          sold: 1           
        }
      }
    ])
    res.json(data)
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}