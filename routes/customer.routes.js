const { getLoction, updateCustomerInfo } = require("../controller/customer.controller")

const router=require("express").Router()

router
.post("/get-location",getLoction)
.post("/update-info",updateCustomerInfo)

module.exports=router