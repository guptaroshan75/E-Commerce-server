const express = require('express');
const { addEnquiryDetails } = require('../controllers/Enquiry.controller');
const router = express.Router();

router.post('/addEnquiryDetails', addEnquiryDetails);

module.exports = router;