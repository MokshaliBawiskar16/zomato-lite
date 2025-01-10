const mongoose=require("mongoose")

const resturantScheema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
mobile:{type:String,required:true},
password:{type:String,required:true},
address:{type:String,required:true},
city:{type:String,required:true},
certificate:{type:String,required:true},
type:{type:String,enum:["veg","non-veg"],required:true,default:"veg"},
hero:{type:String,required:true},
startTime:{type:String,required:true},
endTime:{type:String,required:true},
isActive:{type:Boolean,default:false,required:true},
infocomplete:{type:Boolean,default:false},
},{timestamps:true})
module.exports=mongoose.model("resturant",resturantScheema)