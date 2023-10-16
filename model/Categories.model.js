const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    catName: {
        type: String,
        required: true,
    },
    myImage: {
        type: String
    },
    status: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('categories', CategorySchema);