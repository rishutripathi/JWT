const jwt= require('jsonwebtoken');
require('dotenv').config();
let token;
const verifyToken= (req,res,next)=>{
      try {
        token=req.body.token || req.headers['authorization'].split(" ")[1];     
        if(!token)
        throw new Error;
      }
      catch(err){
       return res.status(403).json({Message:"A valid token is missing for Authentication"});
        
    }
    try{
        token=req.body.token || req.headers['authorization'].split(" ")[1];     
        let decode=jwt.verify(token, process.env.secretKey);
        console.log(decode);
    } 
    catch (err) {
        res.status(403).json({Message:"Invalid Token"});
    }
     next();
}

module.exports=verifyToken;