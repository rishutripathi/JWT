const express=require('express');
const router=express.Router();
const registerCntrl=require('../controllers/registerCntrl.js')


router.post('/register',registerCntrl);

module.exports=router;