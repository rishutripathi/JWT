const loginCntrl=require('../controllers/loginCntrl');

const userHome=async (req,res)=>{

 let user=await loginCntrl.userFunc(req,res);  
 console.log("}}}}}",user);
 res.status(200).json({"Hurrayyyy!!!":`${user.username}, Welcome to your portal!!`});
};

module.exports= userHome;