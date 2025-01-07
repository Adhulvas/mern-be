const express = require('express')
const verifyUser = require('../Middlewares/auth')
const { getAllproducts } = require('../Controllers/ProductController')
const router = express.Router()

router.get('/',verifyUser, getAllproducts)


module.exports=router