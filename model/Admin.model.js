const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Username"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('admin', AdminSchema);