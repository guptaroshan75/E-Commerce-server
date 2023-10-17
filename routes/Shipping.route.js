const express = require('express');
const router = express.Router();
const { getShipping, addShipping, updateShipping, deleteShipping,
} = require('../controllers/Shipping.controller');

router.get('/getShipping', getShipping);

router.post('/addShipping', addShipping);

router.put('/updateShipping/:id', updateShipping);

// router.put('/updateAttributeVisble/:attId', updateAttributeVisble);

router.delete('/deleteShipping/:id', deleteShipping);

module.exports = router;