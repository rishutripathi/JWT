const express=require('express');
const router=express.Router();
const logoutCntrl= require('../controllers/logoutCntrl.js')


router.get('/logout',logoutCntrl);

module.exports=router;