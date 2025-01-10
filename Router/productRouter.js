const express = require('express')
const { addProduct, getCategoryProducts, deleteProduct, getProductDetails } = require('../Controllers/productController');
const upload = require('../MiddleWares/multer');
const userAuth = require('../MiddleWares/userAuth');

const productRouter = express.Router()

productRouter.get('/get-products/:category',userAuth, getCategoryProducts)
productRouter.post('/add-products',upload.single('image'),addProduct)
productRouter.get('/productDetails/:productId',userAuth,getProductDetails)
productRouter.delete('/delete-product/:productId',deleteProduct)


module.exports=productRouter