import Invoice from '../models/Invoice.js'
import Product from '../models/Product.js'

 

export const createInvoice = async(req,res)=>{
    try{

        const {items,discount=0,tax=0,paymentMethod,customer}=req.body

        // if (!items || items.length === 0) {
        //     return res.status(400).json({ message: 'Invoice must have at least one item' });
        // }
        const lastInvoice = await Invoice.findOne().sort({invoiceNumber:-1});
        const invoiceNumber = lastInvoice ? lastInvoice.invoiceNumber + 1 :1000;
        const subTotal = items.reduce((acc,item)=>acc+Number(item.total || 0),0);
        const finalTotal = subTotal - Number(discount) + Number(tax);
        

        const invoice = await Invoice.create({
            invoiceNumber,
            items,
            subTotal,
            discount,
            tax,
            finalTotal,
            paymentMethod,
            cashier:req.user._id,
            customer:customer || null
        })
        for (const i of items){
            const product = await Product.findById(i.productId)
            if(product){
                product.stock -= Number(i.qty) || 0;
                await product.save()
            }
        }
        res.json(invoice)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getInvoices = async(req,res)=>{
    const invoices = await Invoice.find().populate('cashier','name').populate('customer');
    res.json(invoices)
}

export const getInvoiceById = async(req,res)=>{
    const invoice = await Invoice.findById(req.params.id)
    .populate('cashier','name')
    .populate('customer')
    res.json(invoice)
}