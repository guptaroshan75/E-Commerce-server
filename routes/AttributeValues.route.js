const express = require('express');
const router = express.Router();
const { getSpecificAttributeValue, addAttributeValue, updateAttributeValuesVisble,
    singleAttribute, getAllAttributeValues, addaddAttributeValues,
    updateAttributeValues, deleteAttributeValues, getSpecificAttributeValueName
} = require('../controllers/AttributeValues.controller');

router.get('/getAllAttributeValues', getAllAttributeValues);

router.get('/getSpecificAttributeValue/:id', getSpecificAttributeValue);

router.get('/getSpecificAttributeValueName/:attributeName', getSpecificAttributeValueName);

router.post('/addAttributeValue/:id', addAttributeValue);

router.post('/addaddAttributeValues', addaddAttributeValues);

router.get('/singleAttribute/:id', singleAttribute);

router.put('/updateAttributeValuesVisble/:id', updateAttributeValuesVisble);

router.put('/updateAttributeValues/:id', updateAttributeValues);

router.delete('/deleteAttributeValues/:id', deleteAttributeValues);

module.exports = router;