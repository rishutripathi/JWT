const jwt=require('jsonwebtoken');
require('dotenv').config();
const bcrypt=require('bcrypt');
const loginModel=require('../config/schema.js');
const userLogin=async (req,res)=>{

    const user={
     userName:req.body.name,
     email:req.body.email,
     password:req.body.password
     };

   let userDtl= await loginModel.findOne({$and:[{userName:user.userName},{email:user.email}]}, {_id:0});
    if(!userDtl){
      res.status(400).json({Message:"User does not exists, kindly route to /register"});
      return console.log("User does not exists, kindly route to /register");
    }
    if(userDtl && await bcrypt.compare(user.password,userDtl.password)){ 
         setTimeout(()=>{res.redirect(307,'http://localhost:8001/');
                        },2000); 
  }
   else if(bcrypt.compare(user.password,userDtl.password)){
        return res.status(401).json({Message:"Incorrect Password"});  }
   else{
       return res.status(401).json({Message:"Some unknown error"}); }     
  }


module.exports= userLogin;