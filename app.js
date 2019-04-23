'use strict';

// Load Env File

require('dotenv').config();

// Importing packages
const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      dbConfig = require('./connection.js'),
      app = express();
      

// Seting up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const port = process.env.PORT || 5000;

const loginRoute = require('./routes/login');

loginRoute(app);

app.listen(port, (err) => {
    console.log('Server running on port ',port);
})