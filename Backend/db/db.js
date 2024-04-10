const mongoose = require('mongoose');

const db_url = "mongodb+srv://karthik63254:7YOjGSfBOIl0lcdU@cluster0.nrpny5n.mongodb.net/";

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(db_url, {
        });
        console.log('Db Connected');
    } catch (error) {
        console.log(error)
        console.log('DB Connection Error');
    }
}

module.exports = { db };
