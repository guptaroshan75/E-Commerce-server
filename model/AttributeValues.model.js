const mongoose = require('mongoose');

const AttributeValueSchema = new mongoose.Schema({
    attributesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attributes",
    },
    displayName: {
        type: String,
        required: [true, "Please Enter Username"],
    },
    published: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('attributeValues', AttributeValueSchema);