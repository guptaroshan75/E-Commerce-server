const AttributeModel = require('../model/Attributes.model'); 
const AttributeValuesModel = require("../model/AttributeValues.model");

// Get Specific Attribute
const getAttribute = async (req, res) => {
    try {
        const allAttribute = await AttributeModel.find()
        res.status(200).json({
            data: allAttribute,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

// Add the Attribute
const addAttribute = async (req, res) => {
    try {
        const newAddAttribute = new AttributeModel(req.body);
        await newAddAttribute.save();
        res.status(201).json({
            status: "Success",
            data: newAddAttribute,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        })
    }
}

// Update the Attribute Visivlity
const updateAttributeVisble = async (req, res) => {
    try {
        const updatedAttribute = await AttributeModel.updateOne(
            { _id: req.params.attId },
            { $set: { published: !req.body.published } }
        );
        res.status(200).json({
            status: 'Success',
            data: updatedAttribute,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            error: 'An error occurred while updating the Attribute.',
        });
    }
};

// Update the Attribute
const updateAttribute = (req, res) => {
    AttributeModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then(() => {
            res.json({
                msg: "Attribute Updated Successfully",
            });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error: "Failed to Perform Update Operation" });
        });
};

// Delete the Attribute 
const deleteAttribute = async (req, res) => {
    try {
        const attribute = await AttributeModel.findById(req.params.id);
        if (!attribute) {
            return res.json({
                msg: "Attribute Not Found",
            });
        } else {
            await AttributeModel.findByIdAndDelete(req.params.id);
            return res.json({
                msg: "Attribute Deleted Successfully",
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
    getAttribute, addAttribute, updateAttributeVisble, updateAttribute, deleteAttribute,
}