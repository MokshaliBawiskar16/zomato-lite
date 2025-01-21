const asyncHandler=require("express-async-handler")
const {resturantUplod, menuUplod, updateMenuUplod} = require("../utils/uplod")
const vlaidator =require("validator")
const { checkEmpty } = require("../utils/checkEmpty")
const cloud=require("../utils/cloudinary")
const Resturant = require("../modals/Resturant")
const Menu = require("../modals/Menu")
const path=require("path")
const Order = require("../modals/Order")

 exports.updateInfo =asyncHandler(async(req,res)=>{
    resturantUplod(req,res,async(err)=>{
        if (err) {
            console.log(err);
            return res.status(400).json({message:"multer error"})
        }
          //cloudinary
          if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "hero image is require" })
        }
        const {mobile, address,city,type,startTime,endTime}=req.body
        const {isError ,error}= checkEmpty({mobile,address,city,type,startTime,endTime})
        if (isError) {
            return res.status(400).json({ message: "all fileds required",error })
        }
        const image={}
        for (const key in req.files) {
          const {secure_url}= await cloud.uploader.upload(req.files[key][0].path)
          image[key]=secure_url
        }
        // image.certificate=ndcbhgvgyuqwhn
        // image.hero=hsbhjbcusncjn


        console.log(req.user)
        console.log(req.body)//json
        console.log(req.files)//file uplod ka data  (fileds,array raha to=>files)
        //console.log(req.file)//single karoge to hi files multiple uplod hai to files
        await Resturant.findByIdAndUpdate(req.user,{...req.body,...image,infocomplete:true})
        res.json({message:"info update"})
    })
})
// menu crud
exports.addMenu = asyncHandler(async (req, res) => {
    menuUplod(req, res, async (err) => {
  if (!Array.isArray(req.body.type)) {
    const images = []
    for (const item of req.files) {
        const { secure_url } = await cloud.uploader.upload(item.path)
        images.push(secure_url)
    }
    await Menu.create({...req.body,image:images[0],resturant:req.user})
    console.log(req.files);
    
    res.json({ message: "menu add success" })

  } else {
        console.log(req.body);
        console.log(req.files);
        //upload to cloudnary
        const images = []
        for (const item of req.files) {
            const { secure_url } = await cloud.uploader.upload(item.path)
            images.push(secure_url)
        }

        const result = []
        const temp = {}
        for (let i = 0; i < req.body.type.length; i++) {
            for (const key in req.body) {
                temp[key] = req.body[key][i]
            }
            result.push({ ...temp, image: images[i], resturant: req.user })
        }
        await Menu.create(result)
        res.json({ message: "menu add success" })
    }
})
  })
exports.getMenu=asyncHandler(async(req,res)=>{
    const result= await Menu.find({resturant:req.user})
    res.json({message:"menu fetch success",result})
})

exports.deleteMenu = asyncHandler(async (req, res) => {
    const result = await Menu.findById(req.params.mid)

    console.log("resultIMG=>", result.image);

    await cloud.uploader.destroy(path.basename(result.image,path.extname(result.image)))//cludinary vr pn delete karych asle
    
    // step 2 database
    await Menu.findByIdAndDelete(req.params.mid)
    res.json({ message: "menu delete success" })
})
exports.updateMenu=asyncHandler(async(req,res)=>{
    updateMenuUplod(req,res,async(err)=>{
        console.log(req.file);
        
        if (err) {
            console.log(err);
            return res.status(400).json({message:"multer error"})
        }
        const result= await Menu.findById(req.params.mid)
        if (req.file) {
              // delete old imgae
        await cloud.uploader.destroy(path.basename(result.image,path.extname(result.image)))//cludinary vr pn delete karych asle
        // uplod new image
        const { secure_url } = await cloud.uploader.upload(req.file.path)
        // update database
        await Menu.findByIdAndUpdate(req.params.mid,{...req.body,image:secure_url})
        res.json({message:"menu update success"})
    } else {
            await Menu.findByIdAndUpdate(req.params.mid,{...req.body})
            res.json({message:"menu update success"})
            
        }
      
    })
})

exports.getResturantOrders = asyncHandler(async (req, res) => {
    const result = await Order
        .find({ resturant: req.user })
        .select("-resturant -createdAt -updatedAt -__v")
        .populate("customer", "name address")
        .populate("items.dish", "name type image price")
        .sort({ createdAt: -1 })
    res.json({ message: "order fetch success", result })
})
exports.updateResturantStatus = asyncHandler(async (req, res) => {
    await Order.findByIdAndUpdate(req.params.oid, { status: req.body.status })

    res.json({ message: "order status change success" })
})

