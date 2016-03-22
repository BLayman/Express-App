var express = require("express");
var app = express();

app.use(express.static("public"));

app.get('/residents',function(req,res){
var residents = ["Brett","Cassie","Gracie"]
res.json(residents);
});

module.exports = app;