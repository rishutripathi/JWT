const mongoose= require('mongoose');
mongoose.pluralize(null);
const schema= new mongoose.Schema({
      
    userName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},

},{versionKey:false, strict:true, timestamps:true});

module.exports = new mongoose.model('loginModel',schema)
