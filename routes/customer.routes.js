const { getLoction, updateCustomerInfo, getRestoInfo, getRestoMenu } = require("../controller/customer.controller")

const router=require("express").Router()

router
.post("/get-location",getLoction)
.post("/update-info",updateCustomerInfo)
.get("/get-Restoinfo",getRestoInfo)
.get("/get-RestoMenu/:rid",getRestoMenu)

module.exports=router