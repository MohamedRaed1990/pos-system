import express from 'express'
import {
    getAdminNotifications,
    markAdminNotificationSenn,
    createAdminNotification
} from '../controllers/adminNotificationsController.js'
import { protectAdmin , authorizeAdmin } from '../middlewares/adminAuth.js'

const router = express.Router();

router.use(protectAdmin,authorizeAdmin('admin','super-admin'))
router.get('/',getAdminNotifications)
router.post('/',createAdminNotification)
router.put('/:id',markAdminNotificationSenn)

export default router