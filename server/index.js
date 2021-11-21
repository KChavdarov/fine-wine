const express = require('express');
const {PORT} = require('./config/index');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');

start();

async function start() {
    const app = express();

    await databaseConfig();
    expressConfig(app);

    app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});
}