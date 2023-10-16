const mongoose = require('mongoose');

const AttributeSchema = new mongoose.Schema({
    attName: {
        type: String,
        required: [true, "Please Enter Username"],
    },
    displayName: {
        type: String,
        required: [true, "Please Enter Email"],
    },
    options: {
        type: String,
        required: [true, "Please Enter Password"],
    },
    published: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('attributes', AttributeSchema);