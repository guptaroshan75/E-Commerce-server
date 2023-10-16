const ProductModel = require("../model/Product.model");

//Get Specific Product 
const singleProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate("categoryId");
        if (!product) {
            res.status(500).json({
                success: false,
                message: "The product with the given ID not exists",
            });
        }
        res.status(200).json({
            status: "Success",
            TotalResults: product.length,
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

module.exports = { singleProduct }