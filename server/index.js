const express = require('express');
const {PORT} = require('./config');
const expressConfig = require('./config/express');

start();

async function start() {
    const app = express();
    expressConfig(app);
    app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});
}