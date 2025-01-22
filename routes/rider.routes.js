const { getRiderOrder, updateOrderStatus } = require("../controller/rider.controller")

const router=require("express").Router()

router
.get("/get-orders",getRiderOrder)
.put("/update-order-status/:oid",updateOrderStatus)


module.exports=router