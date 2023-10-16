const ShippingModel = require('../model/Shipping.model'); 
// const AttributeValuesModel = require("../model/AttributeValues.model");

// Get Specific Shipping
const getShipping = async (req, res) => {
    try {
        const allShipping = await ShippingModel.find()
        res.status(200).json({
            data: allShipping,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// Add the Shipping
const addShipping = async (req, res) => {
    try {
        const newAddShipping = new ShippingModel(req.body);
        await newAddShipping.save();
        res.status(201).json({
            status: "Success",
            data: newAddShipping,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Update the Attribute Visivlity
// const updateAttributeVisble = async (req, res) => {
//     try {
//         const updatedAttribute = await AttributeModel.updateOne(
//             { _id: req.params.attId },
//             { $set: { published: !req.body.published } }
//         );
//         res.status(200).json({
//             status: 'Success',
//             data: updatedAttribute,
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'Failed',
//             error: 'An error occurred while updating the Attribute.',
//         });
//     }
// };

// Update the Shipping
const updateShipping = (req, res) => {
    ShippingModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then(() => {
            res.json({
                msg: "Shipping Updated Successfully",
            });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error: "Failed to Perform Update Operation" });
        });
};

// Delete the Shipping 
const deleteShipping = async (req, res) => {
    try {
        const Shipping = await ShippingModel.findById(req.params.id);
        if (!Shipping) {
            return res.json({
                msg: "Shipping Not Found",
            });
        } else {
            await ShippingModel.findByIdAndDelete(req.params.id);
            return res.json({
                msg: "Shipping Deleted Successfully",
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
    getShipping, addShipping, updateShipping, deleteShipping,
}