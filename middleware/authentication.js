const jwt= require('jsonwebtoken');
require('dotenv').config();

const verifyToken= (req,res,next)=>{

    const token=req.body.token || req.headers['authorization'].split(" ")[1];

    if(!token)
    return res.status(403).json({Message:"A token is required for authentication."});

    try {
        const decode=jwt.verify(token, process.env.secretKey);
        req.user= decode;

    } catch (err) {
        res.status(403).json({Message:"Invalid token"});
    }
     next();
}

module.exports=verifyToken;