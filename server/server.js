// @ts-ignore

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)
.then(connection => {
    console.log('Connected to MongoDB')
})
.catch(error => {
  console.log(error.message)
 })
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function(req,res, next){
    res.send("middle");
    next();
    console.log('one')
})


app.post()

const port = process.env.PORT || 3002;

app.listen(port,() =>{
    console.log('server runnng at port 3002')
})