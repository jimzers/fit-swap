/** FIT SWAP APP **/
const bodyParser  = require('body-parser'),
      firebase    = require("firebase");
      express     = require('express'),
      config      = require('./.config'),
      path        = require('path'),
      app         = express();



// Initialize Firebase Database
// TODO: Replace with your project's customized code snippet
var configs = {
    apiKey: "firebase.API_KEY",
    authDomain: "fitswap-f2c33.firebaseapp.com",
    databaseURL: "https://fitswap-f2c33.firebaseio.com",
    storageBucket: "fitswap-f2c33.appspot.com",
};
firebase.initializeApp(configs);


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

// Include routes
const indexRoutes = require("./routes/index");
app.use(indexRoutes);

/** SERVER LISTENER **/
app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log("The FitSwap server has started!");
});

