const jwt=require('jsonwebtoken');
require('dotenv').config();
const bcrypt=require('bcrypt');
const loginModel=require('../config/schema.js');
let token;

let userFunc=async (req,res)=>{
  
      let user={
     username:req.body.username,
     email:req.body.email,
     password:req.body.password
     };
     return user;
}

const userLogin=async (req,res)=>{

    let user= await userFunc(req,res);
    let userDtl= await loginModel.findOne({$and:[{userName:user.username},{email:user.email}]}, {_id:0});
    if(!userDtl){
      console.log("User does not exists, kindly route to /register");
      return res.status(400).json({Message:"User does not exists, kindly route to /register"});
    }
    else if(user.username!=userDtl.userName){
        return res.status(401).json({Message:"Incorrect Username"});  }

    else if(!bcrypt.compare(user.password,userDtl.password)){
        return res.status(401).json({Message:"Incorrect Password"});  }

    else{ 
         res.set({'a': 'text/hl'}); 
         setTimeout(()=>{res.redirect(307,'http://localhost:8001/home')
                        },2000);
  }

      
     try{

       let token= jwt.sign(user,process.env.secretKey,{expiresIn: '30m'});
       console.log("Token generated successfully: ",token);
       console.log(`at ${new Date().getHours()}hr ${new Date().getMinutes()}min ${new Date().getSeconds()}s`);
       res.cookie(user.username,token,{maxAge:30*60*1000, httpOnly: true});
       console.log("Cookie",req.cookies[user.username]);

       return token;
     }
     catch(err){
       return res.status(400).json({Message:"Failed to generate token",error: err.message});
     }
   
}

module.exports= {userLogin,userFunc};