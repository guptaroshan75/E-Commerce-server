const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('blogs', BlogSchema);