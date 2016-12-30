var express = require("express");
var path = require("path");
var api = require('./app/urlshort.js');
var app = express();


app.use(express.static(path.join(__dirname, "public")));

api(app);


app.listen(8080, function() {
	console.log("Listening on port 8080");
});
