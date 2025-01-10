const multer=require("multer")
const storage=multer.diskStorage({
    filename:(req,file,cb)=>{cb(null,file.originalname)},
    // destination:()=>{},
})

// multiple file asla tr ha function
const resturantUplod=multer({storage}).fields([
    {name:"certificate",maxCount:1},
    {name:"hero",maxCount:1}
])

// single file asile tr asa karta
const menuUplod=multer({storage}).array("image")
const updateMenuUplod=multer({storage}).single("image")

module.exports={resturantUplod,menuUplod,updateMenuUplod}