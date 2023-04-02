const loginModel= require('../config/schema.js');
const user= require('../controllers/loginCntrl.js');

const userLogout=async(req,res)=>{
    res.send("Logged out");
    
    await loginModel.updateMany({},{$unset:{token:""}}).then(()=>console.log("Token Deleted")).catch(()=>{console.log("Could not delete Token")});
};
module.exports= userLogout;
