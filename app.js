const express = require('express')
const path = require('path')
const DBconnect = require('./Config/db')
const cors = require('cors')
const env = require('dotenv')
const productRouter = require('./Router/productRouter')
const userRouter = require('./Router/userRouter')
const categoryRouter = require('./Router/categoryRouter')
env.config()
console.log(process.env.JWT_PASSWORD);


const app=express()

DBconnect()
app.use(cors({
  origin:['http://localhost:3000','https://mern-fe-9uqx.onrender.com'],
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type','Authorization'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/category',categoryRouter)


app.use((err,req,res,next)=>{
  res.status(500).json({message:"server error",err:err})
})


app.listen(7000,()=>{
  console.log('server is running at port 7000');
})