
var app = require('./app');

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  console.log("listening on port 8080");
});

