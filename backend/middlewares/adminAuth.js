import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export const protectAdmin = async (req , res , next) => {
    console.log('Cookies:', req.cookies)
    const token = req.cookies.token;
    console.log('Token:', token)
    if(!token)
        return res.status(401).json({message:'Unauthorized'})
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log('Decoded:', decoded)
        const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Not an admin' });
    }

    req.admin = admin;
    next();
    }catch(err){
        console.log('JWT Error:', err.message)
        res.status(401).json({message:'Invalid Token'})
    }
}

export const authorizeAdmin = (...roles) => {
    return (req , res , next) => {
        if(!roles.includes(req.admin.role))
            return res.status(403).json({message:'Access Denied'})
        next()
    }
    
}