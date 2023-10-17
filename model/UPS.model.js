const mongoose = require('mongoose');

const UPSSchema = new mongoose.Schema({
    shippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shippings",
    },
    accessKey: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pickupMethod: {
        type: String,
        default: true,
    },
    packingType: {
        type: String,
        default: true,
    },
    customerCode: {
        type: Number,
        default: true,
    },
    originCode: {
        type: String,
        default: true,
    },
    originCity: {
        type: String,
        default: true,
    },
    originState: {
        type: String,
        default: true,
    },
    originCountry: {
        type: String,
        default: true,
    },
    originZip: {
        type: String,
        default: true,
    },
    testMode: {
        type: String,
        default: true,
    },
    quoteType: {
        type: String,
        default: true,
    },
    services: [{
        type: String,
        default: true,
    }],
    insurance: {
        type: String,
        default: true,
    },
    displayWeight: {
        type: String,
        default: true,
    },
    weightClass: {
        type: String,
        default: true,
    },
    lengthClass: {
        type: String,
        default: true,
    },
    dimensions: {
        type: Number,
        default: true,
    },
    taxClass: {
        type: String,
        default: true,
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
    },
    debugMode: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ups', UPSSchema);