const express = require('express');
const { addToCart, getAddToProductCart } = require('../controllers/Cart.controller');
const router = express.Router();

// router.post('/addToCart', addToCart);
router.get('/getAddToProduct', getAddToProductCart);
router.post('/addToCart/:id', addToCart);

module.exports = router;