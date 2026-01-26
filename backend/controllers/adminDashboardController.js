import Admin from '../models/Admin.js'
import Invoice from '../models/Invoice.js'
import Product from '../models/Product.js'

export const getDashboardStatus = async(req , res)=>{
    const totalAdmins = await Admin.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalInvoices = await Invoice.countDocuments()
    const totalSales = await Invoice.aggregate([{$group:{_id:null,sum:{$sum:'$finalTotal'}}}])

    res.json({
        totalAdmins,
        totalInvoices,
        totalProducts,
        totalSales:totalSales[0]?.sum || 0
    })
}