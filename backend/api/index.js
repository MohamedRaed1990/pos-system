import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from "../routes/adminAuthRoutes.js";
import adminUsersRoutes from "../routes/adminUsersRoutes.js";
import adminDashboardRoutes from "../routes/adminDashboardRoutes.js";
import adminProjectsRoutes from "../routes/adminProjectsRoutes.js";
import adminTransactionsRoutes from "../routes/adminTransactionsRoutes.js";
import adminNotificationsRoutes from "../routes/adminNotificationsRoutes.js";
import adminSettingsRoutes from "../routes/adminSettingsRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import invoiceRoutes from "../routes/invoiceRoutes.js";
import customerRoutes from "../routes/customerRoutes.js";
import reportsRoutes from "../routes/reportsRoutes.js";
import notificationRoutes from "../routes/notificationRoutes.js";
import settingsRoutes from "../routes/settingsRoutes.js";
import userAuthRoutes from "../routes/userAuthRoutes.js";
     
// dotenv.config()

const app = express()

// 1. حدد المواقع المسموح لها بالوصول
const allowedOrigins = [
    'https://pos-system-eight-lake.vercel.app',
    'http://localhost:5173'
];

// 2. إعدادات CORS
app.use(cors({
    origin: function (origin, callback) {
        // السماح بالطلبات التي ليس لها origin (مثل Postman أو السيرفرات الأخرى)
        if (!origin) return callback(null, true);
        
        // التحقق مما إذا كان الموقع موجود في القائمة
        const isVercel = origin.endsWith('.vercel.app');
        const isLocal = origin.startsWith('http://localhost');
        if (isVercel || isLocal || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // اطبع الـ origin المرفوض في الـ Logs لتعرف ما هو بالضبط
            console.log("Blocked Origin:", origin);
            callback(new Error('CORS policy violation'), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With','Accept']
}));

// 3. معالجة طلبات OPTIONS لجميع المسارات
app.options('*', cors());

// app.use(cors({
//     origin:['http://localhost:5173','https://pos-system-eight-lake.vercel.app/'],
//     credentials:true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }))

app.use(express.json())
app.use(cookieParser())

app.get('/api',(req , res)=> res.json({message:"API is running..."}))

app.use('/api/admin/auth' , authRoutes)
app.use('/api/admin/users' , adminUsersRoutes)
app.use('/api/admin/dashboard' , adminDashboardRoutes)
app.use('/api/admin/projects' , adminProjectsRoutes)
app.use('/api/admin/transactions' , adminTransactionsRoutes)
app.use('/api/admin/notifications' , adminNotificationsRoutes)
app.use('/api/admin/settings' , adminSettingsRoutes)



app.use('/api/products' , productRoutes)
app.use('/api/invoices' , invoiceRoutes)
app.use('/api/customers' , customerRoutes)
app.use('/api/reports' , reportsRoutes)
app.use('/api/notifications' , notificationRoutes)
app.use('/api/settings' , settingsRoutes)
app.use('/api/auth' , userAuthRoutes)

app.use((req,res)=> res.status(404).json({message:'Route Not Found'}))

app.use((err,req,res,next)=>{
    console.error(err)
    res.status(500).json({message:err.message})
})

const PORT = process.env.PORT || 5000

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("MongoDB Connected")
//     // app.listen(PORT , () => console.log(`Server running on port ${PORT}`))
// })
// .catch(err => console.log(err))

// const connectDB = async () => {
//     if (mongoose.connection.readyState >= 1) return;
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("MongoDB Connected");
//     } catch (err) {
//         console.error("MongoDB Connection Error:", err);
//     }
// };

// // Middleware للتأكد من الاتصال قبل معالجة أي طلب
// app.use(async (req, res, next) => {
//     await connectDB();
//     next();
// });


// متغير لتخزين حالة الاتصال
// let isConnected = false;

// const connectDB = async () => {
//     mongoose.set('strictQuery', true);
//     if (isConnected) return;

//     try {
//         const db = await mongoose.connect(process.env.MONGO_URI);
//         isConnected = db.connections[0].readyState;
//         console.log("MongoDB Connected");
//     } catch (err) {
//         console.error("MongoDB Connection Error:", err);
//         throw err;
//     }
// };

// // Middleware للتأكد من الاتصال قبل معالجة أي Route
// app.use(async (req, res, next) => {
//     try {
//         await connectDB();
//         next();
//     } catch (err) {
//         res.status(500).json({ message: "Database connection failed" });
//     }
// });

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        console.log("Attempting to connect to Mongo with URI length:", process.env.MONGO_URI?.substring(0, 15));
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Critical: MongoDB connection failed!", error.message);
        // لا تترك السيرفر ينهار بصمت
    }
};

// في الـ Middleware
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ error: "Database connection failed" });
    }
});

export default app;