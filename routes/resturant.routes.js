const { updateInfo,addMenu, getMenu, deleteMenu, updateMenu } = require("../controller/resturant.controller")

const router=require("express").Router()

router
.post("/update-info",updateInfo)
.post("/add-menu",addMenu)
.get("/get-menu",getMenu)
.delete("/delete-menu/:mid",deleteMenu)
.put("/update-menu/:mid",updateMenu)

module.exports=router