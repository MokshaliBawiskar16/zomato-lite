const { getRiderOrder } = require("../controller/rider.controller")

const router=require("express").Router()

router
.get("/get-orders",getRiderOrder)


module.exports=router