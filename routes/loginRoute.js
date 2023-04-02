const express=require('express');
const router=express.Router();
const bodyParser= require('body-parser');
router.use(bodyParser.json());
const loginCntrl=require('../controllers/loginCntrl.js');

router.post('/login',loginCntrl);

module.exports=router;