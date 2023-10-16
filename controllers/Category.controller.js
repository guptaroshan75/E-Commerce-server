const CategoriesModel = require("../model/Categories.model");
const ProductModel = require("../model/Product.model");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

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
  const catName = req.body.catName;
  const myImage = req.file.filename;
  upload.single('myImage')(req, res, async (err) => {
    try {
      const newCategory = await CategoriesModel.create({ catName, myImage });
      res.status(201).json({
        status: "Success",
        data: newCategory,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
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
const updateCategory = (req, res) => {
  upload.single('myImage') (req, res, async (err) => {
    const catName = req.body.catName;
    const myImage = req.file.filename;
  CategoriesModel.findByIdAndUpdate(req.params.id, { catName, myImage }, {
    new: true,
  })
    .then(() => {
      res.json({
        msg: "Product Updated Successfully",
      });
    })
    .catch(error => {
      console.log(error);
      res.json({ error: "Failed to Perform Update Operation" });
    });
})};

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
