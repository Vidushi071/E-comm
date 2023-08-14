const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
// const Product = require('../models/product');
const User = require('../models/user');


router.get('/user/profile',isLoggedIn, async(req, res) => {
    
    
    const user = await User.findById(req.user._id);

    res.render('profile/profile', { user});
})


module.exports = router;
