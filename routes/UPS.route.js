const express = require('express');
const router = express.Router();
const {
    getAllUPS, singleUpsShipping, getSpecificUpsValue, addUpsShipping,
    addUpsShippingVal, deleteUpsShipping, updateUpsShipping, updateUpsShippingStatus,
}  = require('../controllers/UPS.controller');

router.get('/getAllUPS', getAllUPS);

router.get('/getSpecificUpsValue/:id', getSpecificUpsValue);

// router.get('/getSpecificAttributeValueName/:attributeName', getSpecificAttributeValueName);

router.post('/addUpsShipping/:id', addUpsShipping);

router.post('/addUpsShippingVal', addUpsShippingVal);

router.get('/singleUpsShipping/:id', singleUpsShipping);

router.put('/updateUpsShippingStatus/:id', updateUpsShippingStatus);

router.put('/updateUpsShipping/:id', updateUpsShipping);

router.delete('/deleteUpsShipping/:id', deleteUpsShipping);

module.exports = router;