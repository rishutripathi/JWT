const express=require('express');
const router=express.Router();
const bodyParser= require('body-parser');
router.use(bodyParser.json());
const registerCntrl=require('../controllers/registerCntrl.js');

router.get('/register',(req,res)=>{
                 res.render("register.ejs",{title:"Record Entry"})})
      .post('/register',registerCntrl);

module.exports=router;