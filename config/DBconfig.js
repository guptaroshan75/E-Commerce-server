const mongoose = require('mongoose');

const URI = process.env.DBURI;

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DBURI);
        console.log('DB Connected Successfully');
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDatabase;

