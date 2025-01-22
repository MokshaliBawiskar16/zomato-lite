const { registerAdmin, loginAdmin, verifyAdminOTP, logoutAdmin, registerResturant, loginResturent, logoutResturent, registerCustomer, loginCustomer, verifyCustomerOTP, logoutCustomer, loginRider, logoutRider } = require("../controller/auth.controller")

const router=require("express").Router()

router
.post("/register-admin",registerAdmin)
.post("/login-admin",loginAdmin)
.post("/verify-admin-otp",verifyAdminOTP)
.post("/logout-admin",logoutAdmin)

.post("/register-restorunt",registerResturant)
.post("/login-resto",loginResturent)
.post("/logout-resto",logoutResturent)

.post("/register-customer",registerCustomer)
.post("/login-customer",loginCustomer)
.post("/verify-customer-otp",verifyCustomerOTP)
.post("/logout-customer",logoutCustomer)

.post("/login-rider",loginRider)
.post("/logout-rider",logoutRider)
module.exports=router