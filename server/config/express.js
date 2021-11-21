const express = require('express');
const cors = require('cors');
const logger = require('../middleware/logger');
const router = require('./router');

const {CORS} = require('.');


module.exports = (app) => {
    app.use(cors(CORS));

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(logger());

    app.use('/api', router);
    app.get('/', (req, res) => res.send('API access available at endpoint \'/api\''));
};