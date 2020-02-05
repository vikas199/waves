// @ts-ignore

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/waves')
.then(connection => {
    console.log('Connected to MongoDB')
})
.catch(error => {
  console.log(error.message)
 })
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//models
const { User } = require('./models/user')

// users
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err, doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})

app.post('/api/users/login', (req,res)=>{
 User.findOne({'email': req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSucess: false, message:'Auth Failed, no user found'});
        user.comparePassword(req.body.password,(err,isMatch)=>{
         if(!isMatch) return res.json({loginSucess: false,message:'Wrong Password'});
         user.generateToken((err,user)=>{
         if(err) return res.status(400).send(err);
         res.cookie('w_auth',user.token).status(200).json({
             loginSucess:true
         })
         })
        })
    })
})

const port = process.env.PORT || 3002;

app.listen(port,() =>{
    console.log('server runnng at port 3002')
})