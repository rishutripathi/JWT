const jwt=require('jsonwebtoken');
require('dotenv').config();
const loginModel=require('../config/schema.js');
const homeRoute=require('../routes/homeRoute.js');
const userLogin=async (req,res)=>{

    const user={
     userName:req.body.name,
     email:req.body.email,
     password:req.body.password
    };

   let userDtl= await loginModel.findOne({$and:[{userName:user.userName},{email:user.email},{ password:user.password}]}, {_id:0});
    if(!userDtl){
      res.status(400).json({Message:"User does not exists, kindly route to /register"});
     return console.log("User does not exists, kindly route to /register");
    }
     
         setTimeout(()=>{res.redirect(307,'http://localhost:8001/');
             //status(200)
             //.json({User:a,
             // Message:"Hii" })},2000 );
            },2000); 
  }
    


module.exports= userLogin;