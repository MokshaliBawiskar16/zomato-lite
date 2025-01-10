const mongoose=require("mongoose")

const riderScheema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
mobile:{type:String,required:true},
password:{type:String,required:true},
licence:{type:String,required:true},
rc:{type:String,required:true},
gender:{type:String,enum:["male","female"],required:true},
dob:{type:String,required:true},
profile:{type:String,required:true},
isActive:{type:Boolean,default:false,required:true},

},{timestamps:true})
module.exports=mongoose.model("rider",riderScheema)