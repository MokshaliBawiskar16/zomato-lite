const { getLoction, updateCustomerInfo, getRestoInfo, getRestoMenu, PlaceOrder, getOrder } = require("../controller/customer.controller")

const router=require("express").Router()

router
.post("/get-location",getLoction)
.post("/update-info",updateCustomerInfo)
.get("/get-Restoinfo",getRestoInfo)
.get("/get-RestoMenu/:rid",getRestoMenu)
.post("/place-order",PlaceOrder)
.get("/get-orders",getOrder)


module.exports=router