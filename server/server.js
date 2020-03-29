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
const { Brand } = require('./models/brand')
const { Wood } = require('./models/wood')
const { Product } = require('./models/product')

//Middlewares

const { auth } = require('./middleware/auth')
const { admin } = require('./middleware/admin')

////=========================================

//             PRODUCTS

//===========================================


// by Arrival
// /articles?sortBy=createdAt&order=desc&limit=4

// by sell
// articles?sortBy=sold&order=desc&limit=4


app.get('/api/product/articles',(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find().
    populate('brand').
    populate('wood').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.send(articles)
    })
})


app.get('/api/product/articles_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }
Product.find({ '_id':{$in:items}}).
populate('brand').
populate('wood').
exec((err,docs) => {
return res.status(200).send(docs)
})
})



app.post('/api/product/article',auth,admin,(req,res)=>{
    const product= new Product(req.body);
    
    product.save((err,doc)=>{
        if(err) return res.json({sucess: false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
    })
////=========================================

//             WOODS

//===========================================

app.post('/api/product/wood', auth,admin,(req,res)=>{
const wood= new Wood(req.body);

wood.save((err,doc)=>{
    if(err) return res.json({sucess: false,err});
    res.status(200).json({
        success: true,
        wood: doc
    })
})
})

app.get('/api/product/woods', (req,res)=>{
    Wood.find({},(err,woods)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(woods)
    })
})
 
////=========================================

//             BRANDS

//===========================================

app.post('/api/product/brand',auth,(req,res)=>{
const brand = new Brand(req.body);
brand.save((err,doc)=>{
    if(err) return res.json({success:false,err});
    res.status(200).json({
        success: true,
        brand:doc
    })
})
})

////=========================================

//                USERS

//===========================================
app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})
    
// users
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err, doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
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


app.get('/api/users/logout',auth,(req,res)=>{
User.findOneAndUpdate(
    {_id: req.user._id},
    {token:''},
    (err,doc)=>{
        if(err) return res.json({success: false,err});
        return res.status(200).send({
            success: true
        })
    }
)
})
const port = process.env.PORT || 3002;

app.listen(port,() =>{
    console.log('server runnng at port 3002')
})