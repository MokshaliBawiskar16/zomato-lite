const mongoose=require("mongoose")

const orderScheema=new mongoose.Schema({
customer:{type:mongoose.Types.ObjectId,ref:"customer",required:true}, //kise customer ka
resturant:{type:mongoose.Types.ObjectId,ref:"resturant",required:true},//kise resturant se kiya
items:[ //multiple menu order honege bolk array liya[]
    {
        dish: {type:mongoose.Types.ObjectId,ref:"menu",required:true},
        qty: {type:Number,required:true},
    }
],
rider:{type:mongoose.Types.ObjectId,ref:"rider"},//kise rider ko assigne kiya tha

status:{
    type:String,enum:["placed","cooking","packing","out","delivered"]
}

},{timestamps:true})
module.exports=mongoose.model("order",orderScheema)