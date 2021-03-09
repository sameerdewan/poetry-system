const mongoose = require('mongoose');

async function connectDB() {
    return await mongoose.connect(process.env.MONGO_DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
}

module.exports = connectDB;
