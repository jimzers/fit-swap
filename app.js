<<<<<<< HEAD

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
// Get a reference to the database service
var db = firebase.database();

// const ref = db.ref('ninjas');
// ref.push({
//    name: "Ru Wikmann",
//    location: "London, England",
//    email: "ru@wickmann.com"
// })
// .catch(err => {
//    console.log(err);
// });


// Get a reference to the database service
var database = firebase.database();

// Initialize express app
var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

const indexRoutes = require("./routes/index");
app.use(indexRoutes);

/** SERVER LISTENER **/
app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log("The FitSwap server has started!");
});
=======

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
// Get a reference to the database service
var db = firebase.database();

// const ref = db.ref('ninjas');
// ref.push({
//    name: "Ru Wikmann",
//    location: "London, England",
//    email: "ru@wickmann.com"
// })
// .catch(err => {
//    console.log(err);
// });


// Get a reference to the database service
var database = firebase.database();

// Initialize express app
var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

const indexRoutes = require("./routes/index");
app.use(indexRoutes);

/** SERVER LISTENER **/
app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log("The FitSwap server has started!");
});
>>>>>>> a581a4f78b85d55f67987dbd001490e57ca195ab
