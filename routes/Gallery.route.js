const express = require('express');
const router = express.Router();
const {getAllGallery, getSpecificGallery, addGallery} = require('../controllers/Gallery.controller')

router.get('/getAllGallery', getAllGallery);

router.get('/getSpecificGallery/:id', getSpecificGallery);

router.post('/addGallery', addGallery);

module.exports = router;
