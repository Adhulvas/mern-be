const jwt = require('jsonwebtoken')

const verifyUser=(req,res,next)=>{
  const token=req.headers['authorization'].split(' ')[1] 
  jwt.verify(token,process.env.JWT_PASSWORD,(err,decodedToken)=>{
    if (decodedToken) {
      console.log(decodedToken);
      
      next()
    }else{
      res.status(401).json({message:"unauthorized user"})
    }
  })
  console.log(token);
  
}


module.exports = verifyUser;
