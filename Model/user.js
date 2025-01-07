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
  age:{
    type:Number,
    min:6,
    max:20
  },
  createdAt:{
    type:Date,
    default:new Date(),
    immutable:true 
  },
  status:{
    type:String,
    enum:['Active','Inactive','Processing'] 
  },
  password:{
    type:String
  }
})

const user=mongoose.model('users',userSchema) 
userSchema.index({email:1,name:1})  
module.exports=user