const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    myImage: {
        type: String,
    },
    productSKU: {
        type: String,
        required: true,
    },
    productBarcode: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    category: {
        type: String,
        required: true,
    },
    attributeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attributes",
    },
    attributes: {
        type: String,
        required: true,
    },
    attributesValue: [{
        type: String,
        required: true,
    }],
    price: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productSlug: {
        type: String,
        required: true,
    },
    productTags: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('products', ProductSchema)