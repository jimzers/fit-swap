
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();


/** SERVER LISTENER **/
app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log("The FitSwap server has started!");
});