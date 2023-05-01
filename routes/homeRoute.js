const express=require('express');
const router=express.Router();
const bodyParser= require('body-parser');
router.use(bodyParser.json());
const homeCntrl=require('../controllers/homeCntrl.js');
const authentication= require('../middleware/authentication.js');

router.post('/home',authentication,homeCntrl);

module.exports=router;