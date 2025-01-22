const mongoose=require("mongoose")

const resturantScheema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},

mobile:{type:String},
address:{type:String},
city:{type:String},
certificate:{type:String},
type:{type:String,enum:["veg","non-veg"],},
hero:{type:String},

startTime:{type:String},
endTime:{type:String},
isActive:{type:Boolean,default:false},
infocomplete:{type:Boolean,default:false},
},{timestamps:true})
module.exports=mongoose.model("resturant",resturantScheema)