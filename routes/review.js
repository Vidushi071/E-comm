const express= require('express')
const router = express.Router();
const Product = require('../models/product')
const Review = require('../models/review')
const {validateReview,isLoggedIn} = require('../middleware')

router.post('/products/:productid/review',isLoggedIn,validateReview,async(req, res) => {

    try{
        const { productid } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productid);

    const review = new Review({ rating, comment });

    
        // Average Rating Logic
    const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
    product.avgRating = parseFloat(newAverageRating.toFixed(1));
    product.reviews.push(review);

    await review.save();
    await product.save();

    req.flash('success','Added your review successfully!')
    res.redirect(`/products/${productid}`);
    }
    catch(err){
        res.status(500).render('error',{err:err.message})
    }

    
});


router.delete('/product/:productId/review/:reviewId', isLoggedIn, async (req, res) => {
    const productId = req.params.productId; // Get the product ID from the route parameter
    const reviewId = req.params.reviewId; // Get the review ID from the route parameter

    try {
        // Find the product by ID
        const product = await Product.findById(productId);


        // Remove the review ID from the reviews array
        product.reviews.pull(reviewId);

        // Save the updated product
        await product.save();
        res.redirect(`/products/${productId}`);
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});














module.exports=router;