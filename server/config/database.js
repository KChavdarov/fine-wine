const {DB_CONNECTION_STRING} = require('./index');
const mongoose = require('mongoose');

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_CONNECTION_STRING), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        const db = mongoose.connection;

        db.once('open', () => {
            console.log('database connected');
            resolve();
        });

        db.on('error', (error) => {
            console.log(error.message);
            reject(error.message);
        });
    });
};