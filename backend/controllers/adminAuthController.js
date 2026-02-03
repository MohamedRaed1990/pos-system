import Admin from '../models/Admin.js'
import { sendAdminToken } from '../utils/generateAdminToken.js'

export const adminRegister = async(req , res) => {
    try{
        const {name , email , password , role} = req.body
        if(await Admin.findOne({email})){
            return res.status(400).json({message:'Email exists'})
        }
        const admin = new Admin({name , email , password , role})
        await admin.save()
        sendAdminToken(admin,res)
        // res.json({message:'Admin Created',admin})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const adminLogin = async(req,res)=>{
    try{
        const {email , password} = req.body
        const admin = await Admin.findOne({email})
        if(!admin)
            return res.status(400).json({message:'Invalid Credentials'})
        if(password !== admin.password)
            return res.status(400).json({message:'Invalid Credentials'})
        sendAdminToken(admin,res)
        // res.json({message:'Logged in',admin})
        console.log('ADMIN LOGIN HIT')
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const adminLogout = (req , res) => {
    res.cookie('token','',{maxAge:1})
    res.json({message:'Logged out'})
}

export const getAdminProfile = (req,res)=>{
    res.json(req.admin)
}
