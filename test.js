var test = require('supertest');
var app = require("./app");

describe("requests to the root path", function(){
    it('returns a 200 status code', function(done){
        
        test(app)
.get('/')
.expect(200)
.end(function(error){
   if(error) throw error;
       done();
   
    });

});
   
});

describe("Listing on /cities", function() {
    it("returns 200 status code", function(done) {
        test(app)
        .get('/cities')
        .expect(200,done);
    });
    
     it("returns JSON", function(done) {
        test(app)
        .get('/cities')
        .expect("Content-Type",/json/,done);
    });
    
    it("returns residents", function(done) {
        test(app)
        .get('/cities')
        .expect(JSON.stringify(["Brett","Cassie","Gracie"]),done);
    });
    
    it("Returns html format", function(done){
        test(app)
        .get('/')
        .expect("Content-Type",/html/,done);
    });
    
       it("Returns html index file titled 'building blocks'.", function(done){
        test(app)
        .get('/')
        .expect(/building blocks/i,done);
    });

    
});


   