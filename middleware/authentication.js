const jwt= require('jsonwebtoken'); 
const loginCntrl= require('../controllers/loginCntrl.js');
const loginModel= require('../config/schema.js')
require('dotenv').config();
let token;
const verifyToken=async (req,res,next)=>{

  let user=await loginCntrl.userFunc(req,res);
  console.log("############",user);
      try {
        token=req.cookies[user.username] || req.headers['authorization'].split(" ")[1];     
        if(!token)
        throw new Error ("A valid token is missing for Authentication");
      }
      catch(err){
       return res.status(403).json({loginStatus:"Failed", Message:err.message});
        
    }
    try{
        let decode=jwt.verify(req.cookies[user.username], process.env.secretKey);
        if(!decode)
        throw new Error ("Token can't be verified");
    } 
    catch (err) {
        return res.status(403).json({loginStatus:"Failed", Message:err.message});
    }
     next();
}

module.exports=verifyToken;