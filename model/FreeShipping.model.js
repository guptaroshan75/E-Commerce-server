const mongoose = require('mongoose');

const FreeSchemaSchema = new mongoose.Schema({
    shippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shippings",
    },
    total: {
        type: Number,
    },
    geoZone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    sortOrder: {
        type: Number,
        default: true,
    }
});

module.exports = mongoose.model('freeShipping', FreeSchemaSchema);