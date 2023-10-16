const express = require('express');
const router = express.Router();
const { searchProducts, deleteProduct, updateProduct, updateProductVisble, getSpecifiCatName,
    getAllProducts, addProducts, getSpecificCategoryProducts, addAttributeValue,
    updateProductWithCat
} = require('../controllers/Product.controller');

router.get('/getAllProducts', getAllProducts);

router.get('/searchProducts/:key', searchProducts);

router.get('/getSpecifiCatName/:catName/:displayName', getSpecifiCatName);

router.post('/addProducts', addProducts);

router.post('/addAttributeValue/:catName/:displayName', addAttributeValue);

router.get('/getSpecificCategoryProducts/:id', getSpecificCategoryProducts);

router.put('/updateProductWithCat/:categoryId', updateProductWithCat);

router.put('/updateProduct/:id', updateProduct);

router.put('/updateProductVisble/:productId', updateProductVisble);

router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;