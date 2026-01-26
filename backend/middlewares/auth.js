import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async(req , res , next) => {
    const token = req.cookies.token;

    console.log("1. Token from cookie:", token);
    
    if(!token)
        return res.status(401).json({message:"Unauthorized , no token"})
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        console.log("2. Decoded ID from token:", decoded.id);

        const user = await User.findById(decoded.id).select('-password')

        if (!user) {
            console.log("3. User NOT found in DB");
            return res.status(401).json({ message: "User no longer exists" });
        }

        console.log("3. User found in DB:", user);

        req.user = user;
        next()
    }catch(err){
        console.log("JWT Error:", err.message);
        res.status(401).json({message:'Invalid Token'})
    }
}

export const authorize = (...roles)=>{
    return (req , res , next) => {
        if(!req.user || !roles.includes(req.user.role))
            return res.status(403).json({message:'Access Denied'})
        next()
    }
}