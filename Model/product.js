const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  isbn:{
    type:String,
    required:true
  },
  pageCount:{
    type:Number
  },
  thumbnailUrl:{
    type:String
  },
  shortDescription:{
    type:String
  },
  longDescription:{
    type:String
  },
  status:{
    type:String, enum:['PUBLISH','UNPUBLISH'], default: 'PUBLISH'
  },
  authors:{
    type: [String], required:true
  },
  categories:{
    type: [String]
  },
  price:{
    type:Number
  }
})

const products=mongoose.model('products',productSchema)
module.exports=products