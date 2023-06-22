const express=require('express');
const router=express.Router();
const bodyParser= require('body-parser');
router.use(bodyParser.json());
const logoutCntrl= require('../controllers/logoutCntrl.js');


router.post('/logout',logoutCntrl);

module.exports=router;