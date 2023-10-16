const GalleryModel = require("../model/Gallery.model");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, body, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Get All Gallery
const getAllGallery = async (req, res) => {
  try {
    const allGallery = await GalleryModel.find();
    res.status(200).json({
      status: "Success",
      TotalResults: allGallery.length,
      data: allGallery,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

//Get Specific Gallery
const getSpecificGallery = async (req, res) => {
  try {
    const gallery = await GalleryModel.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({
        status: "Failed",
        error: "Gallery not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

//Add the Gallery
const addGallery = async (req, res) => {
  upload.single('galleryImage')(req, res, async (err) => {
    const galleryImage = req.file.filename;
    const imageTitle = req.body.imageTitle;
    try {
      const newAddGallery = await GalleryModel.create({ galleryImage, imageTitle });
      res.status(201).json({
        status: "Success",
        data: newAddGallery,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
  });
};

module.exports = { getAllGallery, getSpecificGallery, addGallery };
