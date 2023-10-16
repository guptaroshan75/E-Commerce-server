const express = require('express');
const { addUsersCheck } = require('../controllers/Users.controller');
const router = express.Router();

router.post('/addUsersCheck', addUsersCheck);

module.exports = router;