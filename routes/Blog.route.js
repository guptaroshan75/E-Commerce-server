const express = require('express');
const router = express.Router();
const {  getAllBlogs, addBlogs, getSpecificBlog } = require('../controllers/Blog.controller')

router.get('/getAllBlogs', getAllBlogs);

router.get('/getSpecificBlog/:id', getSpecificBlog);

router.post('/addBlogs', addBlogs);

module.exports = router;
