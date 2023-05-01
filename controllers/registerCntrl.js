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

<<<<<<< HEAD
     
=======
    jwt.sign({user:userDtl},process.env.secretKey,{expiresIn: '1h'},async (err,token)=>{
      if (err) {
       return res.status(400).json({Message:"Failed to generate token",error: err.message});
     }
       console.log("Token generated successfully: ",token);
       console.log(`at ${new Date().getHours()}hr ${new Date().getMinutes()}min ${new Date().getSeconds()}s`);
       await loginModel.updateOne({userName:userDtl.userName},{$set:{token:token}},{upsert:true});
       console.log("Token successfully saved in DB");
       await loginModel.findOne({$and:[{userName:userDtl.userName},{email:userDtl.email}]},{password:0});
        });    
>>>>>>> bca3bb0f8e23b0846097c6941414ee019fb12629
  };

module.exports=userRegister;