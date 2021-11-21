const express = require('express');
const cors = require('cors');
const {CORS} = require('./index');
const router = require('./router');
const logger = require('../middleware/logger');
const storage = require('../middleware/storage');

module.exports = (app) => {
    app.use(cors(CORS));
    // add cookie parser
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(logger());

    app.use(storage());

    app.use('/api', router);
    app.get('/', (req, res) => res.send('API access available at endpoint \'/api\''));
};