require('dotenv').config();
const express= require('express');
const path= require('path');
const bodyParser= require('body-parser');
const app=express();

const homeRoute= require('./routes/homeRoute.js');
const loginRoute= require('./routes/loginRoute.js');
const logoutRoute= require('./routes/logoutRoute.js');
const registerRoute= require('./routes/registerRoute.js');
const mongoose=require('mongoose');
mongoose.pluralize(null);


app.use(bodyParser.json(),express.json(), express.urlencoded({ extended:true }), express.static(path.join(__dirname)));
app.use(homeRoute,loginRoute,logoutRoute,registerRoute);

app.set('view engine','ejs');
app.set('views', path.resolve(__dirname,'views'));

const port= process.env.port || 8000;

app.listen(port, (err)=>{
   if(err)
    return console.log("Some error occured in connecting to port", err);
    console.log(`App is listening on localhost:${port}`)
   
    mongoose.connect(process.env.uri,{useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.once('open',()=>{console.log(`Successfully connected to DB`)},).once('error',()=>{console.log(`Failed to connect to DB`)});
  
});