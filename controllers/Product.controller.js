const CategoriesModel = require("../model/Categories.model");
const ProductModel = require("../model/Product.model");
const AttributeModel = require('../model/Attributes.model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, body, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await ProductModel.find({});
        res.status(200).json({
            status: 'Success',
            TotalResults: allProducts.length,
            data: allProducts,
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message,
        })
    }
}

//Search Product By Name
const searchProducts = async (req, res) => {
    try {
        const searchProduct = await ProductModel.find({
            "$or": [
                { productTags: { $regex: req.params.key } },
            ]
        })
        if (searchProduct.length === 0) {
            return res.status(404).json({
                status: "Not Found",
                message: "Product not found.",
            });
        }
        res.status(201).json({
            status: "Success",
            TotalResults: searchProduct.length,
            data: searchProduct,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Get Specific Category With Products
const getSpecificCategoryProducts = async (req, res) => {
    try {
        const { _id } = await CategoriesModel.findById(req.params.id);
        const products = await ProductModel.find({ categoryId: { $in: _id } }).populate('categoryId');
        // const products = await ProductModel.find({ categoryId: _id }).populate('categoryId');
        // const products = await ProductModel.find({ categoryId: { $in: [ '64ab93ceb6dc423b4d85c493' ] } });
        res.status(200).json({
            status: "Success",
            TotalResults: products.length,
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// Add the Products with category id 
// const addProducts = async (req, res) => {
//     try {
//         const { _id } = await CategoriesModel.findById(req.params.id)
//         const { productName, description, myImage, productSKU, productBarcode, productCategory,
//             productDefCategory, price, salePrice, productQuantity, productSlug, productTags
//         } = req.body;
//         const newAddProducts = await ProductModel.create({
//             category: _id, productName, description, myImage, productSKU, productBarcode,
//             productCategory, productDefCategory, price, salePrice, productQuantity,
//             productSlug, productTags
//         });
//         res.status(201).json({
//             status: "Success",
//             data: newAddProducts,
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: "Failed",
//             error: error.message,
//         })
//     }
// }

// Add the Products
const addProducts = async (req, res) => {
    upload.single('myImage')(req, res, async (err) => {
        const myImage = req.file.filename;
        try {
            const newAddProducts = await ProductModel.create({ myImage }, req.body);
            res.status(201).json({
                status: "Success",
                data: newAddProducts,
            });
        } catch (error) {
            res.status(400).json({
                status: "Failed",
                error: error.message,
            });
        }
    });
}

// Add the product with category name and attribute name
const addAttributeValue = async (req, res) => {
    upload.single('myImage')(req, res, async (err) => {
        const myImage = req.file.filename;
        const catName = req.params.catName;
        const displayName = req.params.displayName;
        const categoryId = await CategoriesModel.findOne({ catName: catName });
        const attributeId = await AttributeModel.findOne({ displayName: displayName });
        const { productName, description, productSKU, productBarcode,
            category, attributes, attributesValue, price, salePrice,
            productQuantity, productSlug, productTags, published } = req.body
        try {
            const addproductWithCat = await ProductModel.create({
                categoryId: categoryId._id, productName, description, myImage: myImage, productSKU,
                productBarcode, category, attributes, attributesValue, price, salePrice,
                productQuantity, productSlug, productTags, published, attributeId: attributeId._id
            });
            res.status(201).json({
                status: "Success",
                data: addproductWithCat,
            });
        } catch (error) {
            res.status(400).json({
                status: "Failed",
                error: error.message,
            });
        }
    })
}

// Get Specific category and attribute With all product
const getSpecifiCatName = async (req, res) => {
    try {
        const catName = req.params.catName;
        const displayName = req.params.displayName;
        const categoryId = await CategoriesModel.findOne({ catName: catName });
        const attributeId = await AttributeModel.findOne({ displayName: displayName });
        const specificProduct = await
            ProductModel.find({ attributeId: attributeId._id, categoryId: categoryId._id });
        res.status(200).json({
            status: "Success",
            TotalResults: specificProduct.length,
            data: specificProduct,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

const updateProductWithCat = async (req, res) => {
    try {
        const updatedProductCat = await ProductModel.updateOne(
            { _id: req.params.categoryId },
            { $set: { category: req.body.category } }
        );
        res.status(200).json({
            status: 'Success',
            data: updatedProductCat,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            error: 'An error occurred while updating the product.',
        });
    }
};

// Update the Product Visivlity
const updateProductVisble = async (req, res) => {
    try {
        const updatedProduct = await ProductModel.updateOne(
            { _id: req.params.productId },
            { $set: { published: !req.body.published } }
        );
        res.status(200).json({
            status: 'Success',
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            error: 'An error occurred while updating the product.',
        });
    }
};

// Update the Product
// const updateProduct = (req, res) => {
//     upload.single('myImage')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({
//                 status: 'Failed',
//                 error: err.message,
//             });
//         }
//         const myImage = req.file ? req.file.filename : req.body.myImage;

//         const updatedProductData = {
//             myImage, 
//             productName: req.body.productName,
//             description: req.body.description,
//             productSKU: req.body.productSKU,
//             productBarcode: req.body.productBarcode,
//             category: req.body.category,
//             attributes: req.body.attributes,
//             attributesValue: req.body.attributesValue,
//             price: req.body.price,
//             salePrice: req.body.salePrice,
//             productQuantity: req.body.productQuantity,
//             productSlug: req.body.productSlug,
//             productTags: req.body.productTags,
//         };

//         try {
//             const updatedProduct = await ProductModel.findByIdAndUpdate(
//                 req.params.id,
//                 updatedProductData,
//                 { new: true }
//             );

//             if (!updatedProduct) {
//                 return res.status(404).json({
//                     status: 'Not Found',
//                     error: 'Product not found',
//                 });
//             }

//             res.json({
//                 status: 'Success',
//                 data: updatedProduct,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 status: 'Failed',
//                 error: 'An error occurred while updating the product.',
//             });
//         }
//     });
// };

const updateProduct = (req, res) => {
    upload.single('myImage')(req, res, async (err) => {
        const myImage = req.file.filename;
        const { productName, description, productSKU, productBarcode, category, attributes,
            attributesValue, price, salePrice, productQuantity, productSlug, productTags
        } = req.body;
        ProductModel.findByIdAndUpdate(req.params.id, {
            myImage, productName, description, productSKU, productBarcode, category, attributes,
            attributesValue, price, salePrice, productQuantity, productSlug, productTags
        }, {
            new: true,
        })
            .then(() => {
                res.json({
                    msg: "Product Updated Successfully",
                });
            })
            .catch(error => {
                console.log(error);
                res.json({ error: "Failed to Perform Update Operation" });
            });
    })
};

// Delete the Poducts 
const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.json({
                msg: "Product Not Found",
            });
        } else {
            await ProductModel.findByIdAndDelete(req.params.id);
            return res.json({
                msg: "Product Deleted Successfully",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            error: error.message,
        });
    }
}

module.exports = {
    getAllProducts, addProducts, searchProducts, updateProductVisble, getSpecifiCatName,
    getSpecificCategoryProducts, deleteProduct, updateProduct, addAttributeValue,
    updateProductWithCat
}