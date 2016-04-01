var test = require('supertest');
var app = require("./app");
var redis = require("redis");
var client = redis.createClient();
client.flushdb();

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

describe("Listing on /blocks", function() {
    it("returns 200 status code", function(done) {
        test(app)
        .get('/blocks')
        .expect(200,done);
    });
    
     it("returns JSON", function(done) {
        test(app)
        .get('/blocks')
        .expect("Content-Type",/json/,done);
    });
    
    it("returns residents array", function(done) {
        test(app)
        .get('/blocks')
        .expect(JSON.stringify([]),done);
    });
    


});

describe("Posting on /blocks", function() {
   
    
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
   
      it("Validates name and description", function(done){
      test(app)
    .post('/blocks')
    .send("name=&description=")
    .expect(400,done); 
   }); 
    
});

describe("Deleting blocks", function() {
    
    before(function(){
        client.hset('residents','stacie','Gracies other cousin');
    });
    
    after(function(){
        client.flushdb();
    });
    
     it("returns 204 status code", function(done) {
         
        test(app)
        .delete('/blocks/stacie')
        .expect(204,done);
     });
});

describe("Show resident description", function() {
   
        before(function(){
        client.hset('residents','stacie','Gracies other cousin');
    });
    
    after(function(){
        client.flushdb();
    });
    
     it("returns 200 status code", function(done) {
        test(app)
        .get('/blocks/stacie')
        .expect(200,done);
     });
     
       it("Returns html format", function(done){
        test(app)
        .get('/blocks/stacie')
        .expect("Content-Type",/html/,done);
    });
    
       it("Returns resident info", function(done){
        test(app)
        .get('/blocks/stacie')
        .expect(/cousin/,done);
    });
}); 
 