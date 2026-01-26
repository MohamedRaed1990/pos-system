import AdminNotifiaction from '../models/adminNotification.js'

export const getAdminNotifications = async(req , res )=>{
    const notes = await AdminNotifiaction.find().sort({createAt:-1})
    res.json(notes)
}

export const markAdminNotificationSenn = async(req,res)=>{
    const note = await AdminNotifiaction.findByIdAndUpdate(req.params.id,{seen:true},{new:true});
    res.json(note)
}

export const createAdminNotification = async(req,res)=>{
    const note = await AdminNotifiaction.create(req.body)
    res.json(note)
}