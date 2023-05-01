const loginModel= require('../config/schema.js');
const user= require('../controllers/loginCntrl.js');
const loginCntrl=require('../controllers/loginCntrl.js');

const userLogout=async(req,res)=>{
    res.cookie("JWT",loginCntrl.token,{maxAge:0});
    res.send("Logged out");
    
};
module.exports= userLogout;
