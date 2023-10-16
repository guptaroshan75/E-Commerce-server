const express = require('express');
const router = express.Router();
const {  getAllFreeShipping, singleShipping, getSpecificFreeShippingValue, addFreeShipping,
    addFreeShippingVal, deleteFreeShipping, updateFreeShipping, updateFreeShippingStatus,
} = require('../controllers/FreeShipping.controller');

router.get('/getAllFreeShipping', getAllFreeShipping);

router.get('/getSpecificFreeShippingValue/:id', getSpecificFreeShippingValue);

// router.get('/getSpecificAttributeValueName/:attributeName', getSpecificAttributeValueName);

router.post('/addFreeShipping/:id', addFreeShipping);

router.post('/addFreeShippingVal', addFreeShippingVal);

router.get('/singleShipping/:id', singleShipping);

router.put('/updateFreeShippingStatus/:id', updateFreeShippingStatus);

router.put('/updateFreeShipping/:id', updateFreeShipping);

router.delete('/deleteFreeShipping/:id', deleteFreeShipping);

module.exports = router;