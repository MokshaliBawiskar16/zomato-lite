const cloud = require("cloudinary").v2
cloud.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
module.exports=cloud



