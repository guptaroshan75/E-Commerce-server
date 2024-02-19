const BlogModel = require("../model/Blog.model");
const multer = require('multer');
const cloudinary = require('cloudinary')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const handleMultipartData = multer({ storage: storage }).single('blogImage');

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogModel.find();
    res.status(200).json({
      status: "Success",
      TotalResults: allBlogs.length,
      data: allBlogs,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

//Get Specific Blog
const getSpecificBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        status: "Failed",
        error: "Blog not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

// Add the Blogs
const addBlogs = async (req, res) => {
  handleMultipartData(req, res, async (err) => {
    const filePath = req.file.path;
    const blogTitle = req.body.blogTitle;
    const description = req.body.description;
    const blogImage = req.file.originalname;

    cloudinary.v2.uploader.upload(filePath, {
      public_id: blogImage.substr(0, blogImage.lastIndexOf('.')),
    }, async (error, result) => {
      if (error) {
        return res.status(400).json({
          status: "Failed",
          error: error.message
        });
      }

      if (result.secure_url) {
        try {
          const newAddBlogs = await BlogModel.create({
            blogTitle, description, blogImage: result.secure_url,
          });
          res.status(201).json({
            status: 'Success',
            data: newAddBlogs
          });
        } catch (error) {
          return res.status(500).json({
            status: "Failed",
            error: "Error saving to database"
          });
        }
      } else {
        res.status(400).json({
          status: "Failed",
          error: "Invalid Cloudinary response"
        });
      }
    });
  });
};

module.exports = { getAllBlogs, addBlogs, getSpecificBlog };
