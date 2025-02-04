const mongoose=require("mongoose")

const menuScheema=new mongoose.Schema({
resturant:{type:mongoose.Types.ObjectId,tref:"resturant",required:true},
name:{type:String,required:true},
type:{type:String,enum:["veg","non-veg"],required:true},
price:{type:String,required:true},
desc:{type:String,required:true},
category:{type:String,required:true},
image:{type:String,required:true},
isAvailable:{type:Boolean,default:true},

},{timestamps:true})
module.exports=mongoose.model("menu",menuScheema)