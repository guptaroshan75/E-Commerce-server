const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    quantity: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    totalAmount: {
        type: Number,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('cartCollection', CartSchema);