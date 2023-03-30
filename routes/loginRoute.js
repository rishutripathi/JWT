const express=require('express');
const router=express.Router();
const loginCntrl=require('../controllers/loginCntrl.js');

router.post('/login',loginCntrl);

module.exports=router;