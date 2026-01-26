import mongoose from "mongoose";

const adminNotificationsSchema = new mongoose.Schema({
    message:String,
    type:{type:String , enum:['info','transaction','project']},
    senn:{type:Boolean , default:false},
},{timestamps:true})

export default mongoose.model('AdminNotification', adminNotificationsSchema)