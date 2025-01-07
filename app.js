const express=require('express')
const path=require('path')
const userRouter=require('./Router/user')
const products=require('./Router/products')
const DBconnect = require('./Config/db')
const cors = require('cors')
const env = require('dotenv')
env.config()
console.log(process.env.JWT_PASSWORD);


const app=express()

DBconnect()
app.use(cors({
  origin:['http://localhost:3000'],
  methods:['GET','POST'],
  allowedHeaders:['Content-Type','Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.use('/user',userRouter)
app.use('/products',products)


app.use((err,req,res,next)=>{
  res.status(500).json({message:"server error",err:err})
})


app.listen(7000,()=>{
  console.log('server is running at port 7000');
})