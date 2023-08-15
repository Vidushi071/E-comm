const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');


router.get('/user/cart',isLoggedIn, async(req, res) => {
    
    
    const user = await User.findById(req.user._id).populate('cart');

    const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);

    res.render('cart/cart', { user ,totalAmount});
})


router.post('/user/:productid/add',isLoggedIn, async(req, res) => {
    
    const { productid } = req.params;
    const userid = req.user._id;
    const product = await Product.findById(productid);
    const user = await User.findById(userid);
    
    user.cart.push(product);

    await user.save();

    res.redirect('/user/cart');
})

router.delete('/user/cart/:id', isLoggedIn, async (req, res) => {
    const productId = req.params.id; // Get the productId from the route parameter

    try {
        // Find the user by ID
        const user = await User.findById(req.user._id); // Assuming req.user holds the authenticated user's information
        // Remove the product ID from the cart array
        user.cart.pull(productId);

        // Save the updated user
        await user.save();
        res.redirect('/user/cart');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});






module.exports = router;