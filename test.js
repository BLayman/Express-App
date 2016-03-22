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

describe("Listing on /residents", function() {
    it("returns 200 status code", function(done) {
        test(app)
        .get('/residents')
        .expect(200,done);
    });
    
     it("returns JSON", function(done) {
        test(app)
        .get('/residents')
        .expect("Content-Type",/json/,done);
    });
    
    it("returns residents", function(done) {
        test(app)
        .get('/residents')
        .expect(JSON.stringify(["Brett","Cassie","Gracie"]),done);
    });
    


});

describe("Listing on /blocks", function() {
    
     it("returns 201 status code", function(done) {
        test(app)
        .post('/blocks')
        .send("name=tracie&description=Gracies+cousin.")
        .expect(201,done);
     });
   
   it("Returns block data", function(done){
      test(app)
    .post('/blocks')
    .send("name=Tracie&description=Gracies+cousin.")
    .expect(/Tracie/,done); 
   }); 
    
    
});
   