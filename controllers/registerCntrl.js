const loginModel=require('../config/schema.js');

const userRegister=async (req,res)=>{
     let userDtl= {
    userName:req.body.name,
    email:req.body.email,
    password:req.body.password  };

    if(await loginModel.findOne(userDtl)){
         console.log("Already exists");
         return res.status(401).json({Message:"This document already exists"});
    }
         
      loginModel.create(userDtl)
    .then(()=>res.status(200).json({Message:"User details have been saved"})).catch((err)=>{console.log("Error in saving",err);});
    console.log("User details has been saved",await loginModel.findOne(userDtl));
};


module.exports=userRegister;