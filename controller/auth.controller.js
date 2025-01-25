const asyncHandler=require("express-async-handler")
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const Admin = require("../modals/Admin")
const { genearateOTP } = require("../utils/otp")
const { sendEmail } = require("../utils/email")
const { differenceInSeconds } = require("date-fns")
const { sendSMS } = require("../utils/sms")
const Resturant = require("../modals/Resturant")
const Customer = require("../modals/Customer")
const Rider = require("../modals/Rider")
//admin ragister
exports.registerAdmin= asyncHandler(async(req,res)=>{
    const {name,email,mobile}=req.body
    // sarwa filled bharlele aahe ki nahi he check karta
    if (validator.isEmpty(name) ||validator.isEmpty(email) ||validator.isEmpty(mobile)  ) {
        return res.status(400).json({message:"all filed required"})
    }
    // email validate karto
    if(!validator.isEmail(email)){
        return res.status(400).json({message:"invalid email"})
    }
    // mobile cha country check karile no start kasa hoto kite digit cha aahe te check karile
    if(!validator.isMobilePhone(mobile,"en-IN")){
        return res.status(400).json({message:"invalid mobile"})
    }
     await Admin.create({name,email,mobile})
     res.json({message:"admin register success"})
})
//admin login
exports.loginAdmin=asyncHandler(async(req,res)=>{
    const {name,userName}=req.body
  const result=await Admin.findOne({$or :[{email :userName},{mobile :userName}]})
                                // 👆 mongo ch or operater =>check kartay username :email OR mobile aahe
     if (!result) {
    return res.status(400).json({message:"invalid credentials"})
  }

  //send otp
  const otp=genearateOTP()
  await Admin.findByIdAndUpdate(result._id,{otp,otpSendOn:Date.now()})
  // ise msg jaata par recharge karna padta hai=>(https://www.fast2sms.com/dashboard/dev-api/ )  and API KEY AATI hai wo dalna env me
  // await sendSMS({number:result.mobile,message:`Your OTP is ${otp}`})
  await sendEmail({
    message:`<h1></h1>Your OTP is ${otp}</h1>`,
    subject:"verify otp to login",
    to: result.email
})
  res.json({message:"otp send"})

})

// verify Admin OTP
exports.verifyAdminOTP=asyncHandler(async(req,res)=>{
    const {otp,userName}=req.body

  const result=  await Admin.findOne({$or: [{email:userName},{mobile:userName}]})
  if (!result) {
    return res.status(401).json({message:"invalid credential"})
  }
  if (result.otp !== otp) {
    return res.status(401).json({message:"invalid OTP"})
  }
  // 👇 data-fn madhla fn aahe 2 arg=> curent date , jewha otp gengerate jhala to time
  if (differenceInSeconds(Date.now(),result.otpSendOn)>process.env.OTP_EXPIRES) { //60 sec cha war gela tr login nhi karta yenar
    await Admin.findByIdAndUpdate(result._id,{otp:null})
    return res.status(401).json({message:" OTP expire"})

  }
  await Admin.findByIdAndUpdate(result._id,{otp:null})
  const token=jwt.sign({id:result._id},process.env.JWT_SECRET,{expiresIn:"1d"})
  res.cookie("zomato-admin",token,{
    maxAge:1000*60*60*24,
    httpOnly:true,
    secure:process.env.NODE_ENV === "production"
  })
  res.json({message:"login success",
    result:{
        name:result.name,
        email:result.email
    }})

})
//admin logout
exports.logoutAdmin=asyncHandler(async(req,res)=>{
res.clearCookie("zomato-admin")
res.json({message:"logout admin success"})

})
//resturant ragister

exports.registerResturant= asyncHandler(async(req,res)=>{
  const {name,email,password,cpassword,mobile,address,city,cetificate,type,hero,startTime,endTime}=req.body
  console.log(req.body);
  
  const result= await Resturant.findOne({email})
  if (result) {
    return res.status(400).json({message:" email is allredy Register plz ragister with other email"})
  }
  // const compare= await bcrypt.compare(password,cpassword)
  // if (compare) {
  //   return res.status(400).json({message:"password not match",compare})
  // }
  const hash = await bcrypt.hash(password,10)
  // const chash = await bcrypt.hash(cpassword,10)

   await Resturant.create({...req.body,password:hash})
   res.json({message:"Resturant register success"})
})
//resturant login

exports.loginResturent=asyncHandler(async(req,res)=>{
  const {email,password}=req.body
  const result = await Resturant.findOne({email})
   if (!result) {
   return res.status(401).json({message:"invalid email"})
   }
 
   const comparPass= await bcrypt.compare(password,result.password)
   if (!comparPass) {
       return res.status(409).json({mesage:"invalid credential password"})
   }
   const token= jwt.sign({id:result.id},process.env.JWT_SECRET)
   res.cookie("resturant",token,{
    maxAge:1000*60*60*24,
    httpOnly:true,
    secure: process.env.NODE_ENV === "production"

   })
   res.json({message:"resturant Login success", result: {
    _id: result._id,
    name: result.name,
    email: result.email,
    infocomplete:result.infocomplete
}})
})
//resturant logout
exports.logoutResturent=asyncHandler(async(req,res)=>{
  res.clearCookie("resturant")
  res.json({mesage:"resturant logout success"})

})
//customer ragister
exports.registerCustomer= asyncHandler(async(req,res)=>{
  const {name,email,mobile}=req.body  
  const result= await Customer.findOne({$or: [{mobile},{email}]})
  if (result) {
    return res.status(400).json({message:" email or mobile allredy Register plz ragister with other email"})
  }

   await Customer.create(req.body)
   res.json({message:"customer register success"})
})
//customer login

exports.loginCustomer=asyncHandler(async(req,res)=>{
  const {userName}=req.body
const result=await Customer.findOne({$or :[{email :userName},{mobile :userName}]})
                              // 👆 mongo ch or operater =>check kartay username :email OR mobile aahe
   if (!result) {
  return res.status(400).json({message:"invalid credentials"})
}

//send otp
const otp=genearateOTP()
await Customer.findByIdAndUpdate(result._id,{otp,otpSendOn:Date.now()})
//👇 ise msg jaata par recharge karna padta hai=>(https://www.fast2sms.com/dashboard/dev-api/ )  and API KEY AATI hai wo dalna env me
// await sendSMS({number:result.mobile,message:`Your OTP is ${otp}`})
await sendEmail({
  message:`<h1></h1>Your OTP is ${otp}</h1>`,
  subject:"verify otp to login",
  to: result.email
})
res.json({message:"otp send"})

})
// verify customer OTP
exports.verifyCustomerOTP=asyncHandler(async(req,res)=>{
  const {otp,userName}=req.body

const result=  await Customer.findOne({$or: [{email:userName},{mobile:userName}]})
if (!result) {
  return res.status(401).json({message:"invalid credential"})
}
if (result.otp !== otp) {
  return res.status(401).json({message:"invalid OTP"})
}
// 👇 data-fn madhla fn aahe 2 arg=> curent date , jewha otp gengerate jhala to time
if (differenceInSeconds(Date.now(),result.otpSendOn)>process.env.OTP_EXPIRES) { //60 sec cha war gela tr login nhi karta yenar
  await Customer.findByIdAndUpdate(result._id,{otp:null})
  return res.status(401).json({message:" OTP expire"})

}
await Customer.findByIdAndUpdate(result._id,{otp:null})
const token=jwt.sign({id:result._id},process.env.JWT_SECRET,{expiresIn:"365d"})
res.cookie("zomato-customer",token,{
  maxAge:1000*60*60*24*365,
  httpOnly:true,
  secure:process.env.NODE_ENV === "production"
})
res.json({message:"login success",
  result:{
      name:result.name,
      mobile:result.mobile,
      email:result.email,
      infocomplete:result.infocomplete
  }})

})
//customer logout
exports.logoutCustomer=asyncHandler(async(req,res)=>{
  res.clearCookie("zomato-customer")
  res.json({message:"logout customer success"})
  
  })
//rider login
exports.loginRider=asyncHandler(async(req,res)=>{
  const { userName, password } = req.body
  console.log(req.body);

  const result = await Rider.findOne({ $or: [{ email: userName }, { mobile: userName }] })
  if (!result) {
      return res.status(401).json({ message: "invalid credentials " })
  }
  const isVerify = await bcrypt.compare(password, result.password)
  if (!isVerify) {
      return res.status(401).json({ message: "invalid credentials password" })
  }
  if (!result.isActive) {
      return res.status(401).json({ message: "Accout block by admin" })
  }

  const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

  res.cookie("zomato-rider", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
  })

  res.json({
      message: "rider login success", result: {
          _id: result._id,
          name: result.name,
          email: result.email,
          infoComplete: result.infoComplete,
      }
  })

})
//rider logout
exports.logoutRider=asyncHandler(async(req,res)=>{
  res.clearCookie("zomato-rider")
  res.json({message:"logout Rider success"})
  
  })