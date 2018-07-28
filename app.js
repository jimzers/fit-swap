var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var firebase = require("firebase");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyDkm1KG9gyzQn70FWalWm19OYzGRxxJWoA",
    authDomain: "fitswap-f2c33.firebaseapp.com",
    databaseURL: "https://fitswap-f2c33.firebaseio.com",
    storageBucket: "fitswap-f2c33.appspot.com",
};
firebase.initializeApp(config);


var app = express();

