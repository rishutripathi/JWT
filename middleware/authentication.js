const jwt= require('jsonwebtoken'); 
const loginCntrl= require('../controllers/loginCntrl.js');
const loginModel= require('../config/schema.js')
require('dotenv').config();
let token;
const verifyToken=async (req,res,next)=>{
  
      try {
        token=req.cookies || req.headers['authorization'].split(" ")[1];     
        if(!token)
        throw new Error;
      }
      catch(err){
       return res.status(403).json({Message:"A valid token is missing for Authentication"});
        
    }
    try{
        let decode=jwt.verify(req.cookies, process.env.secretKey);
        if(!decode)
        throw new Error ("Token can't be verified");
    } 
    catch (err) {
        return res.status(403).json({Message:err.message});
    }
     next();
}

module.exports=verifyToken;