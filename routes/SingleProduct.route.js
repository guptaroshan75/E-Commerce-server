const express = require('express');
const router = express.Router();
const { singleProduct } = require('../controllers/SingleProduct.controller');

router.get('/singleProduct/:id', singleProduct);

module.exports = router;