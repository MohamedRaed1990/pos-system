import express from 'express'
import {
    getSettings,
    updateSettings
} from '../controllers/settingsController.js'
import { protect , authorize } from '../middlewares/auth.js'

const router = express.Router();


router.put('/', protect ,authorize('admin'), updateSettings)
router.get('/', protect , getSettings)



export default router