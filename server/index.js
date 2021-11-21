const express = require('express');
const {PORT} = require('./config/index');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const mockData = require('./util/mockData');
const wineService = require('./services/wineService');
const userService = require('./services/userService');

start();

async function start() {
    const app = express();

    await databaseConfig();
    expressConfig(app);

    // const user = await userService.createUser({
    //     firstName: 'Admin',
    //     lastName: 'Admin',
    //     email: 'admin',
    //     phone: '+359888888888',
    //     address: 'The Matrix',
    //     password: 'admin',
    //     _isAdmin: true,
    // });
    // console.log(user);

    // mockData.forEach(async a => {
    //     await wineService.create(a);
    // });

    app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`);});
}