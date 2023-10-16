const CartModel = require('../model/Cart.model');
const ProductModel = require('../model/Product.model');

const getAddToProductCart = async (req, res) => {
    try {
        const getAllAddProducts = await CartModel.find();
        res.status(201).json({
            status: 'Success',
            data: getAllAddProducts,
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message
        })
    }
}

const addToCart = async (req, res) => {
    try {
        const { _id } = await ProductModel.findById(req.params.id);
        const { quantity, amount, totalAmount } = req.body;
        
        const data = await CartModel.create({
            product_id: _id,
            quantity: quantity,
            amount: amount,
            totalAmount: totalAmount
        });
        res.status(200).json({
            status: 'Success',
            data: data,
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message,
        })
    }
}

module.exports = { addToCart, getAddToProductCart }
