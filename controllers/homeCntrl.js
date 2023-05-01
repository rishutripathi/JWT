const loginCntrl=require('../controllers/loginCntrl');

const userHome=async (req,res)=>{
let r1=await loginCntrl.userFunc(req,res);
console.log("r11111",r1);
console.log("222", await loginCntrl.userLogin(req,res));
 res.status(200).json({Message:`${loginCntrl.userN},Welcome to your portal!!`});
};

module.exports= userHome;