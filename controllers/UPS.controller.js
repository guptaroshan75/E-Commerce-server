const ShippingModel = require("../model/Shipping.model");
const UPSModel = require("../model/UPS.model");

// Get All UPS Shipping
const getAllUPS = async (req, res) => {
    try {
        const allUps = await UPSModel.find()
        res.status(200).json({
            status: 'Success',
            TotalResults: allUps.length,
            data: allUps,
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message,
        })
    }
}

// Get Specific Shipping With UPS Shipping
const getSpecificUpsValue = async (req, res) => {
    try {
        const { _id } = await ShippingModel.findById(req.params.id);
        const upsShipping = await UPSModel.find({ shippingId: { $in: [_id] } })
            .populate('shippingId');
        res.status(200).json({
            status: "Success",
            TotalResults: upsShipping.length,
            data: upsShipping,
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
const addUpsShipping = async (req, res) => {
    try {
        const { _id } = await ShippingModel.findById(req.params.id)
        const { accessKey, userName, password, pickupMethod, packingType, customerCode,
            originCode, originCity, originState, originCountry, testMode, quoteType,
            services, insurance, displayWeight, weightClass, lengthClass, dimensions,
            taxClass, geoZone, status, sortOrder, debugMode, originZip } = req.body;
        const newAddUpsShipping = await UPSModel.create({
            shippingId: _id, accessKey, userName, password, pickupMethod, packingType, 
            customerCode, originCode, originCity, originState, originCountry, testMode,
            quoteType, services, insurance, displayWeight, weightClass, lengthClass, dimensions,
            taxClass, geoZone, status, sortOrder, debugMode, originZip
        });
        res.status(201).json({
            status: "Success",
            data: newAddUpsShipping,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Add the UPS Shipping
const addUpsShippingVal = async (req, res) => {
    try {
        const newAddUpsShipping = new UPSModel(req.body);
        await newAddUpsShipping.save();
        res.status(201).json({
            status: "Success",
            data: newAddUpsShipping,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Update the UPS Shipping Status
const updateUpsShippingStatus = async (req, res) => {
    try {
        const updatedUpsShipping = await UPSModel.updateOne(
            { _id: req.params.id },
            { $set: { status: !req.body.status } }
        );
        res.status(200).json({
            status: "Success",
            data: updatedUpsShipping,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: "An error occurred while updating the UPS Shipping.",
        });
    }
};

// Update the UPS Shipping
const updateUpsShipping = (req, res) => {
    UPSModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .then(() => {
            res.json({
                msg: "UPS Shipping Updated Successfully",
            });
        })
        .catch(error => {
            console.log(error);
            res.json({ error: "Failed to Perform Update Operation" });
        });
};

//Get Specific UPS Shipping 
const singleUpsShipping = async (req, res) => {
    try {
        const upsShipping = await ShippingModel.findById(req.params.id)
        if (!upsShipping) {
            res.status(500).json({
                success: false,
                message: "The UPS shipping with the given ID not exists",
            });
        }
        res.status(200).json({
            status: "Success",
            TotalResults: upsShipping.length,
            data: upsShipping,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// Delete the Free Shipping
const deleteUpsShipping = async (req, res) => {
    try {
        const upsShipping = await UPSModel.findById(req.params.id);
        if (!upsShipping) {
            return res.json({
                msg: "UPS Shipping Not Found",
            });
        } else {
            await UPSModel.findByIdAndDelete(req.params.id);
            return res.json({
                msg: "UPS Shipping Deleted Successfully",
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
    getAllUPS, singleUpsShipping, getSpecificUpsValue, addUpsShipping,
    addUpsShippingVal, deleteUpsShipping, updateUpsShipping, updateUpsShippingStatus,
} 