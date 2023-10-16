const express = require('express');
const { addAdminRegister, addAdminLogin } = require('../controllers/Admin.controller');
const router = express.Router();

router.post('/addAdminRegister', addAdminRegister);
router.post('/addAdminLogin', addAdminLogin);

module.exports = router;