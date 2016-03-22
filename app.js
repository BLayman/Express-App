var express = require("express");
var parser = require("body-parser");
var app = express();
var urlEncoded = parser.urlencoded({extended: false});

//residents object
var residents = {
"Brett": "goofy rock climber nerd",
"Cassie": "political research anaylst and obsessive runner",
"Gracie": "chicken chaser, and couch cuddler"
};

//static middlewear
app.use(express.static("public"));

//add initial residents with get
app.get('/residents',function(req,res){

res.json(Object.keys(residents));
});

//post new residents
app.post('/blocks',urlEncoded, function(req,res){
    var newResident = req.body;
    console.log(req.body);
    residents[newResident.name] = newResident.description;
    res.json(newResident.name).status(201);
});


module.exports = app;