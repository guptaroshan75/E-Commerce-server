const GalleryModel = require("../model/Gallery.model");
const multer = require('multer');
const cloudinary = require('cloudinary')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const handleMultipartData = multer({ storage: storage }).single('galleryImage');

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
  handleMultipartData(req, res, async (err) => {
    const filePath = req.file.path;
    const imageTitle = req.body.imageTitle;
    const galleryImage = req.file.originalname;

    cloudinary.v2.uploader.upload(filePath, {
      public_id: galleryImage.substr(0, galleryImage.lastIndexOf('.')),
    }, async (error, result) => {
      if (error) {
        return res.status(400).json({
          status: "Failed",
          error: error.message
        });
      }

      if (result.secure_url) {
        try {
          const newAddGallery = await GalleryModel.create({
            imageTitle, galleryImage: result.secure_url
          });
          res.status(201).json({
            status: 'Success',
            data: newAddGallery
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
  // upload.single('galleryImage')(req, res, async (err) => {
  //   const galleryImage = req.file.filename;
  //   const imageTitle = req.body.imageTitle;
  //   try {
  //     const newAddGallery = await GalleryModel.create({ galleryImage, imageTitle })
  //     res.status(201).json({
  //       status: "Success",
  //       data: newAddGallery,
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       status: "Failed",
  //       error: error.message,
  //     });
  //   }
  // });
};

module.exports = { getAllGallery, getSpecificGallery, addGallery };
