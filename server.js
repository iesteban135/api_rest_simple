'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes');
const config = require('./config')

mongoose.Promise = require('bluebird');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({ limit: '10mb' }));

routes.assignRoutes(app);

mongoose.connect(
    config.db, 
    {
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    },
    (err, res) => {
        if (err) {
            return console.log('Error: ' + err);
        }

        app.listen(config.port, () => {
            console.log(`Server listening on port ${config.port}`);
        });

    });