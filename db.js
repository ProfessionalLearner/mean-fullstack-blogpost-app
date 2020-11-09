const mongoose = require('mongoose');
const config = require('config');


const connectDB = async () => {
    try {
        const dbConn = await mongoose.connect(config.get('databaseURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(`MongoDB connected: ${dbConn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;