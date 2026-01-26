import express from 'express'
import {
    dailyReport,
    rangeReport,
    topProducts
} from '../controllers/reportsController.js'
import { protect , authorize } from '../middlewares/auth.js'

const router = express.Router();

router.post('/daily', protect ,authorize('admin','manager'), dailyReport)
router.post('/weekly', protect ,authorize('admin','manager'), rangeReport)
router.get('/top-products', protect ,authorize('admin','manager'), topProducts)



export default router