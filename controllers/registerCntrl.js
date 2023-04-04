require('dotenv').config();
const loginModel=require('../config/schema.js');
const jwt= require('jsonwebtoken');
const userRegister=async (req,res)=>{
     let userDtl= {
    userName:req.body.name,
    email:req.body.email,
    password:req.body.password  };

    if(await loginModel.findOne(userDtl)){
         console.log("Already exists");
         return res.status(401).json({Message:"This document already exists"});
    }
         
      loginModel.create(userDtl,async (err)=>{
        return console.log("Error in savinguser details",err.message);
        
        res.status(200).json({Message:"User details have been saved"});
      console.log("User details has been saved",await loginModel.findOne(userDtl));
      });

    jwt.sign({user:userDtl},process.env.secretKey,{expiresIn: '1h'},async (err,token)=>{
     try {
      if(!token)
      throw new Error ("Some issue")
      else{
       console.log("Token generated successfully:",token);
       console.log(`Token generated at ${new Date().getHours()}hr ${new Date().getMinutes()}min ${new Date().getSeconds()}s`);
       await loginModel.updateOne({userName:userDtl.userName},{$set:{token:token}},{upsert:true});
       console.log("Token successfully saved in DB");
       let a=await loginModel.findOne({$and:[{userName:user.userName},{email:user.email}]},{password:0});
       
      }    
     } catch (err) {
       res.status(400).json({Message:"Failed to generate token",error: err.message});
     }
  });
};


module.exports=userRegister;