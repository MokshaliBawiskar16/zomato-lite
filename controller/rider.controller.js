const asyncHandler=require("express-async-handler")

const { checkEmpty } = require("../utils/checkEmpty")

const Order = require("../modals/Order")
const { Oid } = require("mongoose/lib/schema/index")
const { io } = require("../socket/socket")



exports.getRiderOrder = asyncHandler(async (req, res) => {
    const result = await Order
        .find({ rider: req.user })
        .select("-rider -createdAt -updatedAt -__v")
        .populate("customer", "name mobile address")
        .populate("resturant", "name hero mobile address")
        .populate("items.dish", "name type image price")
        .sort({ createdAt: -1 })
    res.json({ message: "order fetch success", result })
})
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const {oid}=req.params
    await Order.findByIdAndUpdate(oid,{status:req.body.status})
    io.emit("status-update")
    res.json({ message: "order status update success" })
})


