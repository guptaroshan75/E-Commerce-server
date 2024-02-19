const CategoriesModel = require("../model/Categories.model");
const ProductModel = require("../model/Product.model");
const multer = require('multer');
const cloudinary = require('cloudinary')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const handleMultipartData = multer({ storage: storage }).single('myImage');

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await CategoriesModel.find();
    res.status(200).json({
      status: "Success",
      TotalResults: allCategories.length,
      data: allCategories,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

//Get Specific Categories
const getSpecificCategory = async (req, res) => {
  try {
    const category = await CategoriesModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: "Failed",
        error: "Category not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

// Get Specific Category With Products
const getSpecificCategoryProduct = async (req, res) => {
  try {
    const { _id } = await CategoriesModel.findById(req.params.id);
    const products = await ProductModel.find({ categoryId: { $in: _id } }).populate('categoryId');
    res.status(200).json({
      status: "Success",
      TotalResults: products.length,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

//Add the Categories
const addCategories = (req, res) => {
  handleMultipartData(req, res, async (err) => {
    const filePath = req.file.path;
    const catName = req.body.catName;
    const myImage = req.file.originalname;
    cloudinary.v2.uploader.upload(filePath, {
      public_id: myImage.substr(0, myImage.lastIndexOf('.')),
    }, async (error, result) => {
      if (error) {
        return res.status(400).json({
          status: "Failed",
          error: error.message
        });
      }

      if (result.secure_url) {
        try {
          const newCategory = await CategoriesModel.create({ catName, myImage: result.secure_url });
          res.status(201).json({
            status: 'Success',
            data: newCategory
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
}

// Update the Product Visivlity
const updateCategoryVisble = async (req, res) => {
  try {
    const updatedCategory = await CategoriesModel.updateOne(
      { _id: req.params.catId },
      { $set: { status: !req.body.status } }
    );
    res.status(200).json({
      status: "Success",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: "An error occurred while updating the product.",
    });
  }
};

// Update the Product
// const updateCategory = (req, res) => {
//   handleMultipartData(req, res, async (err) => {
//     const filePath = req.file.path;
//     const catName = req.body.catName;
//     const myImage = req.file.originalname;
//     cloudinary.v2.uploader.upload(filePath, {catName,
//       public_id: myImage.substr(0, myImage.lastIndexOf('.')),
//     }, async (error, result) => {
//       if (error) {
//         return res.status(400).json({
//           status: "Failed",
//           error: error.message
//         });
//       }

//       if (result.secure_url) {
//         CategoriesModel.findByIdAndUpdate(req.params.id, { catName, myImage: result.secure_url },
//           {
//             new: true,
//           })
//           .then(() => {
//             res.json({
//               msg: "Product Updated Successfully",
//             });
//           })
//           .catch(error => {
//             console.log(error);
//             res.json({ error: "Failed to Perform Update Operation" });
//           });
//       } else {
//         res.status(400).json({
//           status: "Failed",
//           error: "Invalid Cloudinary response"
//         });
//       }
//     });
//   });
// };
const updateCategory = (req, res) => {
  handleMultipartData(req, res, async (err) => {
    const filePath = req.file ? req.file.path : null;
    const myImage = req.file ? req.file.originalname : null;
    const catName = req.body.catName;

    if (filePath && myImage) {
      cloudinary.v2.uploader.upload(filePath, {
        catName,
        public_id: myImage.substr(0, myImage.lastIndexOf('.')),
      }, async (error, result) => {
        if (error) {
          return res.status(400).json({
            status: "Failed",
            error: error.message
          });
        }

        if (result.secure_url) {
          updateCategoryDetails(req, res, result.secure_url);
        } else {
          res.status(400).json({
            status: "Failed",
            error: "Invalid Cloudinary response"
          });
        }
      });
    } else {
      updateCategoryDetails(req, res, null);
    }
  });
};
const updateCategoryDetails = (req, res, newImageURL) => {
  const { catName } = req.body;
  const updateData = { catName };

  if (newImageURL) {
    updateData.myImage = newImageURL;
  }

  CategoriesModel.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then(() => {
      res.json({
        msg: "Category Updated Successfully",
      });
    })
    .catch(error => {
      console.log(error);
      res.json({ error: "Failed to Perform Update Operation" });
    });
};

// Delete the Poducts
const deleteCategory = async (req, res) => {
  try {
    const category = await CategoriesModel.findById(req.params.id);
    if (!category) {
      return res.json({
        msg: "Category Not Found",
      });
    } else {
      await CategoriesModel.findByIdAndDelete(req.params.id);
      return res.json({
        msg: "Category Deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories, addCategories, getSpecificCategory, getSpecificCategoryProduct,
  updateCategoryVisble, updateCategory, deleteCategory,
};
