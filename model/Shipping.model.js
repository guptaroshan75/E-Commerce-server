const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
    shippingName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('shippings', ShippingSchema);