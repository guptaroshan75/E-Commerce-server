const CheckModel = require('../model/Users.model');

const addUsersCheck = async (req, res) => {
    try {
        const newUsersAdd = CheckModel(req.body);
        await newUsersAdd.save();
        res.status(201).json({
            status: 'Success',
            data: newUsersAdd,
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: error.message
        })
    }
}

module.exports = { addUsersCheck }