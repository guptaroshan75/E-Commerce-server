const ShippingModel = require("../model/Shipping.model");
const FreeShippingModel = require("../model/FreeShipping.model");

// Get All Free Shipping
const getAllFreeShipping = async (req, res) => {
    try {
        const allFreeShipping = await FreeShippingModel.find()
        res.status(200).json({
            status: 'Success',
            TotalResults: allFreeShipping.length,
            data: allFreeShipping,
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message,
        })
    }
}

// Get Specific Shipping With Free Shipping
const getSpecificFreeShippingValue = async (req, res) => {
    try {
        const { _id } = await ShippingModel.findById(req.params.id);
        const freeShipping = await FreeShippingModel.find({ shippingId: { $in: [_id] } })
            .populate('shippingId');
        res.status(200).json({
            status: "Success",
            TotalResults: freeShipping.length,
            data: freeShipping,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// // Get Specific Attributes With AttributeValue with name 
// const getSpecificAttributeValueName = async (req, res) => {
//     try {
//         const attributeName = req.params.attributeName;
//         const attributesId = await AttributeModel.findOne({ displayName: attributeName });
//         const attributeValue = await AttributeValuesModel.find({ attributesId: attributesId._id });
//         if (!attributeValue) {
//             return res.status(404).json({
//                 message: 'Attribute value not found'
//             });
//         }
//         res.status(200).json({
//             status: "Success",
//             TotalResults: attributeValue.length,
//             data: attributeValue,
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "Failed",
//             error: error.message,
//         });
//     }
// };

// Add the FreeShipping with Shipping Id 
const addFreeShipping = async (req, res) => {
    try {
        const { _id } = await ShippingModel.findById(req.params.id)
        const { total, geoZone, status, sortOrder } = req.body;
        const newAddFreeShipping = await FreeShippingModel.create({
            shippingId: _id, total, geoZone, status, sortOrder
        });
        res.status(201).json({
            status: "Success",
            data: newAddFreeShipping,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Add the FreeShipping
const addFreeShippingVal = async (req, res) => {
    try {
        const newAddFreeShipping = new FreeShippingModel(req.body);
        await newAddFreeShipping.save();
        res.status(201).json({
            status: "Success",
            data: newAddFreeShipping,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Update the FreeShipping Status
const updateFreeShippingStatus = async (req, res) => {
    try {
        const updatedFreeShipping = await FreeShippingModel.updateOne(
            { _id: req.params.id },
            { $set: { status: !req.body.status } }
        );
        res.status(200).json({
            status: "Success",
            data: updatedFreeShipping,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: "An error occurred while updating the FreeShipping.",
        });
    }
};

// Update the FreeShipping
const updateFreeShipping = (req, res) => {
    FreeShippingModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .then(() => {
            res.json({
                msg: "Free Shipping Updated Successfully",
            });
        })
        .catch(error => {
            console.log(error);
            res.json({ error: "Failed to Perform Update Operation" });
        });
};

//Get Specific Shipping 
const singleShipping = async (req, res) => {
    try {
        const shipping = await ShippingModel.findById(req.params.id)
        if (!shipping) {
            res.status(500).json({
                success: false,
                message: "The shipping with the given ID not exists",
            });
        }
        res.status(200).json({
            status: "Success",
            TotalResults: shipping.length,
            data: shipping,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// Delete the Free Shipping
const deleteFreeShipping = async (req, res) => {
    try {
        const freeShipping = await FreeShippingModel.findById(req.params.id);
        if (!freeShipping) {
            return res.json({
                msg: "Free Shipping Not Found",
            });
        } else {
            await FreeShippingModel.findByIdAndDelete(req.params.id);
            return res.json({
                msg: "Free Shipping Deleted Successfully",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            error: error.message,
        });
    }
};

module.exports = {
    getAllFreeShipping, singleShipping, getSpecificFreeShippingValue, addFreeShipping,
    addFreeShippingVal, deleteFreeShipping, updateFreeShipping, updateFreeShippingStatus,
} 