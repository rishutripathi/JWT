const loginCntrl= require('../controllers/loginCntrl.js');
exports.userLogout= async (req,res)=>{

    const userq=await loginCntrl.userFunc(req,res);
    console.log("user!!!!!",userq);
    console.log("cookies$$$$$$",req.cookies);
    res.cookie(userq.username, req.cookies[userq.username],{maxAge:0});
    res.status(200).json({logOutStatus:"Logged out now"});
    
};

