const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')


mongoose.connect('mongodb://127.0.0.1:27017/E-comm')
.then(() => { console.log("Db Connected")})
.catch((err)=>{ console.log(err)});


app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))




const productRoutes = require('./routes/product')
const reviewRoutes= require('./routes/review')






app.use(productRoutes);
app.use(reviewRoutes);



app.get('/',(req,res)=>{

    res.render('index');
})



const port = 8000;
app.listen(port,()=>{
    console.log("Server running at port 8000")
})