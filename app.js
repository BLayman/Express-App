var express = require("express");
var parser = require("body-parser");
var redis = require("redis");
var path = require('path');
var client = redis.createClient();
var app = express();
var urlEncoded = parser.urlencoded({extended: false});

//redis data
client.select("app".length);

//static middlewear
app.use(express.static("public"));

//add initial residents with get
app.get('/residents',function(req,res){
    client.hkeys("residents", function(error, names){
        if(error) throw error;
        res.json(names);
    });

});

//post new block
app.post('/blocks',urlEncoded, function(req,res){
    var newResident = req.body;
    if(!newResident.name || !newResident.description){
        res.sendStatus(400);
        return false
    }
    console.log(req.body);
    client.hset('residents', newResident.name, newResident.description, function(error){
        if(error) throw error;
 res.status(201).json(newResident.name);
        
    });
});
// delete block entries
app.delete('/blocks/:name', function(req,res){
    client.hdel('residents',req.params.name,function(error) {
        if (error) throw error;
        res.sendStatus(204);
    });
    
});


module.exports = app;