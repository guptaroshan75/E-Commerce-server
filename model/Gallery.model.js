const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    imageTitle: {
        type: String,
        required: true,
    },
    galleryImage: {
        type: String
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('gallery', GallerySchema);