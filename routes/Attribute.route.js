const express = require('express');
const router = express.Router();
const { getAttribute, addAttribute, updateAttributeVisble, updateAttribute, deleteAttribute,
} = require('../controllers/Attribute.controller');

router.get('/getAttribute', getAttribute);

router.post('/addAttribute', addAttribute);

router.put('/updateAttribute/:id', updateAttribute);

router.put('/updateAttributeVisble/:attId', updateAttributeVisble);

router.delete('/deleteAttribute/:id', deleteAttribute);

module.exports = router;