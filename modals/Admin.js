const mongoose=require("mongoose")

const adminScheema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
mobile:{type:String,required:true},
otp:{type:String},
otpSendOn:{type:Date},
},{timestamps:true})
module.exports=mongoose.model("admin",adminScheema)