const express = require('express')
const verifyUser = require('../MiddleWares/auth')
const { getAllproducts } = require('../Controllers/productController')
const router = express.Router()

router.get('/',verifyUser, getAllproducts)


module.exports=router