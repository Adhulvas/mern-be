const  PRODUCTS = require('../Model/product')

const getAllproducts=(req,res,next)=>{
PRODUCTS.find().limit(50).then((data)=>{
    res.status(200).json(data)
  })
}

module.exports={getAllproducts}