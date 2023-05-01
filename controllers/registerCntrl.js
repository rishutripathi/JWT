require('dotenv').config();
const jwt= require('jsonwebtoken');
const bcrypt=require('bcrypt');
const loginModel=require('../config/schema.js');

const userRegister=async (req,res)=>{

          
    
     let userDtl= {
    userName:req.body.username,
    email:req.body.email,
    password:req.body.password  };
    if(await loginModel.findOne({userName:req.body.username})){
         console.log("Already exists");
         return res.status(401).json({Message:"This document already exists"});
    }
    loginModel.create(userDtl).then((r)=>{
               res.status(200).json({Message:"User details have been saved",User:r});}).catch((err)=>{ res.status(400).json({Status:"Error in saving user details",Message: err.message})});

         bcrypt.genSalt(parseInt(process.env.saltRounds),(err,salt)=>{
         if(err)
         return console.error("Unable to generate salt",err.message);
             bcrypt.hash(userDtl.password,salt,async (err,hash)=>{
                    if(err)
                    return console.error("!!",err.message); 
                    await loginModel.updateOne({userName:userDtl.userName},{password:hash});
                  })
              });
        console.log("User details has been saved",await loginModel.findOne({userName:userDtl.userName}));

     
  };

module.exports=userRegister;