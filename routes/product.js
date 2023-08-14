const express = require('express')
const Joi = require('joi');
const router = express.Router();
const Product = require('../models/product')
const {validateProduct,isLoggedIn} = require('../middleware');
const {isSeller,isProductAuthor} = require('../middleware')
// router.get('/products', async(req,res)=>{

//     const products = await Product.find({});
//     res.render('products/index', {products})
// })


// router.get('/products/new',(req,res)=>{
//     res.render('products/new')
// })

// router.post("/products", async(req,res)=>{

//     const {name , img , desc , price} = req.body;

//     await Product.create({name , img , desc , price});

   
//      res.redirect("/products")

//  })

 
// router.get('/products/:id', async (req, res) => {

//     const { id } = req.params;

//     const product = await Product.findById(id).populate('reviews');

//     res.render('products/show', { product });
// });

//  router.get('/products/:id/edit',async(req,res)=>{
//      const { id} = req.params;

//      const product = await Product.findById(id);
//      res.render('products/edit',{product});

//  })

//  router.patch('/products/:id',async(req,res)=>{

//     const {id} = req.params;
//     const {name, price, img, desc} = req.body;
//      await Product.findByIdAndUpdate(id, {name, img, price, desc});
//         res.redirect(`/products/${id}`);
//     })

//      // delete a product

//      router.delete('/products/:id', async (req, res) => {
    
//         try {
//             const { id } = req.params;
//             await Product.findByIdAndDelete(id);
//             res.redirect('/products');
//         }
//         catch (e) {
//             res.status(500).render('error',{err:e.message})   
//         }
//     });
// module.exports = router;
router.get('/products', async (req, res) => {
    
    try {
        const products = await Product.find({});
        res.render('products/index', { products });
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})
    }
});


router.get('/products/new',isLoggedIn,(req, res) => {

    try {
        res.render('products/new');
    }
    catch (e) {
         res.status(500).render('error',{err:e.message})
    }  
});

router.post('/products',isLoggedIn,isSeller,validateProduct,async (req, res) => {
    
    try {
        const { name, img, desc, price } = req.body;
        await Product.create({ name, img, price: parseFloat(price), desc,author:req.user._id });
        req.flash('success', 'Successfully added a new product!');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
});

router.get('/products/:id', async (req, res) => {


    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');
        res.render('products/show', { product}); 
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})
    }
});


router.get('/products/:id/edit',isLoggedIn,isProductAuthor, async (req, res) => {
    
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', { product });
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})
    }  
});

router.patch('/products/:id',isLoggedIn,isProductAuthor, validateProduct,async (req, res) => {
    

    try {
        const { id } = req.params;
        const { name, price, img, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, price, desc, img });
        req.flash('success', 'Edit Your Product Successfully');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect(`/products/${id}/edit`);
    } 
});


router.delete('/products/:id',isLoggedIn,isProductAuthor,async (req, res) => {
    
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error',{err:e.message})   
    }
});




module.exports = router;