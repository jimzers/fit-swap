
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

<<<<<<< HEAD
var app = express();


/** SERVER LISTENER **/
app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log("The FitSwap server has started!");
});
=======
>>>>>>> f15f4faad38f047233466e604e0f5d9669c02732
