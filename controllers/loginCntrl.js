const { json } = require('express');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const loginModel=require('../config/schema.js')

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
     
    jwt.sign({user},process.env.secretKey,{expiresIn: '1h'},async (err,token)=>{
           try {
            if(!token)
            throw new Error ("Some issue")
            else{
             console.log("Token generated successfully:",token);
             console.log(`Token generated at ${new Date().getHours()}hr ${new Date().getMinutes()}min ${new Date().getSeconds()}s`);
             await loginModel.updateOne({"userName":user.userName},{$set:{token:token}},{upsert:true});
             console.log("Token successfully saved in DB");
             res.status(200).json(await loginModel.findOne({$and:[{userName:user.userName},{email:user.email}]},{ password:0}));
            }
                          
           } catch (err) {
             res.status(400).json({Message:"Failed to generate token",error: err});
           }
    });
  }
    


module.exports= userLogin;