const express=require('express');
const router=express.Router();
const bodyParser= require('body-parser');
router.use(bodyParser.json());
const loginCntrl=require('../controllers/loginCntrl.js');

router.get('/login',(req,res)=>{
                       res.render("login.ejs",{title:"Login"})})
      .post('/login',loginCntrl.userLogin);

module.exports=router;