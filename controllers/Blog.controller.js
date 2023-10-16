const BlogModel = require("../model/Blog.model");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, body, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const handleMultipartData = multer({ storage: storage });

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

//Add the Blogs
const addBlogs = async (req, res) => {
  handleMultipartData(req, res, async (err) => {
    const blogImage = req.file.filename;
    const blogTitle = req.body.blogTitle;
    cloudinary.v2.uploader.upload(blogImage, async (error, result) => {
      if (result.secure_url) {
        let newAddBlogs
        try {
            newAddBlogs = await BlogModel.create({
            blogTitle,
            description,
            blogImage: result.secure_url,
          });
        } catch (error) {
          res.send(error.message);
        }

        res.status(201).send(newAddBlogs);
      } else {
        res.send(error.message);
      }
    });
  });
};
// upload.single('blogImage')(req, res, async (err) => {
// const blogImage = req.file.filename;
// const blogTitle = req.body.blogTitle;
// const description = req.body.description;
//   try {
//     const newAddBlogs = await BlogModel.create({ blogTitle, blogImage, description });
//     res.status(201).json({
//       status: "Success",
//       data: newAddBlogs,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "Failed",
//       error: error.message,
//     });
//   }
// });
// };

module.exports = { getAllBlogs, addBlogs, getSpecificBlog };
