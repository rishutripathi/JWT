const express=require('express');
const router=express.Router();
const bodyParser= require('body-parser');
router.use(bodyParser.json());
const authentication= require('../middleware/authentication.js');
const loginCntrl=require('../controllers/loginCntrl.js');

router.post('/login',authentication,loginCntrl);

module.exports=router;