const mongoose = require('mongoose');

const CheckSchema = new mongoose.Schema({
    cardHolderName: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    cvvCode: {
        type: Number,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('users', CheckSchema);