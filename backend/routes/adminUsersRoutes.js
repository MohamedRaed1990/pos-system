import express from 'express'
import {
    getAdminById,
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
} from '../controllers/adminUsersController.js'
import { protectAdmin , authorizeAdmin } from '../middlewares/adminAuth.js'

const router = express.Router();

router.use(protectAdmin,authorizeAdmin('admin','super-admin'))

router.post('/',createAdmin)
router.get('/',getAllAdmins)
router.get('/:id',getAdminById)
router.put('/:id',updateAdmin)
router.delete('/:id',deleteAdmin)


export default router