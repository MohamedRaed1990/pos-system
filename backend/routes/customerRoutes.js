import express from 'express'
import {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
} from '../controllers/customerController.js'
import { protect , authorize } from '../middlewares/auth.js'
// import { protectAdmin , authorizeAdmin } from '../middlewares/adminAuth.js'
const router = express.Router();


router.get('/', protect ,getCustomers)
router.post('/',protect,authorize('manager','admin'),createCustomer)
router.put('/:id',protect,authorize('manager','admin'),updateCustomer)
router.delete('/:id',protect,authorize('admin'),deleteCustomer)
// router.get('/', protectAdmin ,getCustomers)
// router.post('/',protectAdmin,authorizeAdmin('manager','admin','super-admin'),createCustomer)
// router.put('/:id',protectAdmin,authorizeAdmin('manager','admin','super-admin'),updateCustomer)
// router.delete('/:id',protectAdmin,authorizeAdmin('admin','super-admin'),deleteCustomer)

export default router