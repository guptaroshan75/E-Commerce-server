const AttributeModel = require("../model/Attributes.model");
const AttributeValuesModel = require("../model/AttributeValues.model");

// Get All Products
const getAllAttributeValues = async (req, res) => {
    try {
        const allAttributeValues = await AttributeValuesModel.find()
        res.status(200).json({
            status: 'Success',
            TotalResults: allAttributeValues.length,
            data: allAttributeValues,
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message,
        })
    }
}

// Get Specific Attributes With AttributeValue
const getSpecificAttributeValue = async (req, res) => {
    try {
        const { _id } = await AttributeModel.findById(req.params.id);
        const attributeValue = await AttributeValuesModel.find({ attributesId: { $in: [_id] } })
            .populate('attributesId');
        res.status(200).json({
            status: "Success",
            TotalResults: attributeValue.length,
            data: attributeValue,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// Get Specific Attributes With AttributeValue with name 
const getSpecificAttributeValueName = async (req, res) => {
    try {
        const attributeName = req.params.attributeName;
        const attributesId = await AttributeModel.findOne({ displayName: attributeName });
        const attributeValue = await AttributeValuesModel.find({ attributesId: attributesId._id });
        if (!attributeValue) {
            return res.status(404).json({
                message: 'Attribute value not found'
            });
        }
        res.status(200).json({
            status: "Success",
            TotalResults: attributeValue.length,
            data: attributeValue,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// Add the AttributeValue with Attribute Id 
const addAttributeValue = async (req, res) => {
    try {
        const { _id } = await AttributeModel.findById(req.params.id)
        const { displayName, published } = req.body;
        const newAddAttributeValue = await AttributeValuesModel.create({
            attributesId: _id, displayName, published
        });
        res.status(201).json({
            status: "Success",
            data: newAddAttributeValue,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Add the Products
const addaddAttributeValues = async (req, res) => {
    try {
        const newAddProducts = new AttributeValuesModel(req.body);
        await newAddProducts.save();
        res.status(201).json({
            status: "Success",
            data: newAddProducts,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Update the Product Visivlity
const updateAttributeValuesVisble = async (req, res) => {
    try {
        const updatedAttributeValues = await AttributeValuesModel.updateOne(
            { _id: req.params.id },
            { $set: { published: !req.body.published } }
        );
        res.status(200).json({
            status: "Success",
            data: updatedAttributeValues,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: "An error occurred while updating the product.",
        });
    }
};

// Update the Product
const updateAttributeValues = (req, res) => {
    AttributeValuesModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .then(() => {
            res.json({
                msg: "Attribute Values Updated Successfully",
            });
        })
        .catch(error => {
            console.log(error);
            res.json({ error: "Failed to Perform Update Operation" });
        });
};

//Get Specific Attribute 
const singleAttribute = async (req, res) => {
    try {
        const attribue = await AttributeModel.findById(req.params.id)
        if (!attribue) {
            res.status(500).json({
                success: false,
                message: "The attribue with the given ID not exists",
            });
        }
        res.status(200).json({
            status: "Success",
            TotalResults: attribue.length,
            data: attribue,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// Delete the Poducts
const deleteAttributeValues = async (req, res) => {
    try {
        const attributeValues = await AttributeValuesModel.findById(req.params.id);
        if (!attributeValues) {
            return res.json({
                msg: "Attribute Values Not Found",
            });
        } else {
            await AttributeValuesModel.findByIdAndDelete(req.params.id);
            return res.json({
                msg: "Attribute Values Deleted Successfully",
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
    getAllAttributeValues, singleAttribute, getSpecificAttributeValue, addAttributeValue,
    addaddAttributeValues, deleteAttributeValues, updateAttributeValues,
    updateAttributeValuesVisble, getSpecificAttributeValueName
} 