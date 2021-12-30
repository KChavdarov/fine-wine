const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {CORS} = require('./index');
const router = require('./router');
const logger = require('../middleware/logger');
const storage = require('../middleware/storage');
const parseToken = require('../middleware/parseToken');

module.exports = (app) => {
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(cors(CORS));
    app.use(cookieParser());
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(logger());

    app.use(parseToken());
    app.use(storage());

    app.use('/api', router);

    if (process.env.NODE_ENV === 'production') {
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
        });
    } else {
        app.get('/', (req, res) => res.send('API access available at endpoint \'/api\''));
    }
};