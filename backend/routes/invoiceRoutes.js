import express from 'express'
import {
    createInvoice,
    getInvoices,
    getInvoiceById,
} from '../controllers/invoiceController.js'
// import { protect , authorize } from '../middlewares/auth.js'
import { protectAdmin , authorizeAdmin } from '../middlewares/adminAuth.js'
const router = express.Router();


// router.get('/', protect ,getInvoices)
// router.get('/:id', protect ,getInvoiceById)
// router.post('/',protect,authorize('manager','admin'),createInvoice)
router.get('/', protectAdmin ,getInvoices)
router.get('/:id', protectAdmin ,getInvoiceById)
router.post('/',protectAdmin,authorizeAdmin('manager','admin'),createInvoice)


export default router