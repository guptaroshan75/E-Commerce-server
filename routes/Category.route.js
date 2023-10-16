const express = require('express');
const router = express.Router();
const {
    getAllCategories, addCategories, getSpecificCategory, getSpecificCategoryProduct,
    updateCategoryVisble, updateCategory, deleteCategory,
} = require('../controllers/Category.controller')

router.get('/getAllCategories', getAllCategories);

router.get('/getSpecificCategory/:id', getSpecificCategory);

router.post('/addCategories', addCategories);

router.put('/updateCategory/:id', updateCategory);

router.put('/updateCategoryVisble/:catId', updateCategoryVisble);

router.delete('/deleteCategory/:id', deleteCategory);

router.get('/getSpecificCategoryProduct/:id', getSpecificCategoryProduct);

module.exports = router;


