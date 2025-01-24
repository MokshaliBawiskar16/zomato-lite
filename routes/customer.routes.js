const { getLoction, updateCustomerInfo, getRestoInfo, getRestoMenu, PlaceOrder, getOrder, getHistoryOrder } = require("../controller/customer.controller")

const router=require("express").Router()

router
.post("/get-location",getLoction)
.post("/update-info",updateCustomerInfo)
.get("/get-Restoinfo",getRestoInfo)
.get("/get-RestoMenu/:rid",getRestoMenu)
.post("/place-order",PlaceOrder)
.get("/get-orders",getOrder)
.get("/get-history-orders",getHistoryOrder)


module.exports=router