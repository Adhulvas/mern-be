const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name:{
    type:String,
    default:'no name'
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  mobile:{
    type:Number,
    required:true
  },
  password:{
    type:String
  },
  createdAt:{
    type:Date,
    default:new Date(),
    immutable:true 
  }
})

module.exports = mongoose.model('User',userSchema) 