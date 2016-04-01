var parser = require("body-parser");
var redis = require("redis");
var client = redis.createClient();
var urlEncoded = parser.urlencoded({extended: false});
var express = require("express");
var router = express.Router();

//view block
router.route('/')

//add initial residents with get
.get(function(req,res){
    client.hkeys("residents", function(error, names){
        if(error) throw error;
        res.json(names);
    });

})

//post new block
.post(urlEncoded, function(req,res){
    var newResident = req.body;
    if(!newResident.name || !newResident.description){
        res.sendStatus(400);
        return false;
    }
    console.log(req.body);
    client.hset('residents', newResident.name, newResident.description, function(error){
        if(error) throw error;
 res.status(201).json(newResident.name);
        
    });
});

router.route("/:name")

//show description
.get(function(req,res){
    client.hget("residents", req.params.name , function(error, description){
        res.render('show.ejs', {resident:{name:req.params.name, description: description}});
    });

})
// delete block entries
.delete(function(req,res){
    client.hdel('residents',req.params.name,function(error) {
        if (error) throw error;
        res.sendStatus(204);
    });
    
});

module.exports = router;