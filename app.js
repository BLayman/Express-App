var express = require("express");
var app = express();
var blocks = require('./routes/blocks');

//static middlewear
app.use(express.static(__dirname + '/public'));

//using blocks router
app.use("/blocks", blocks);




module.exports = app;