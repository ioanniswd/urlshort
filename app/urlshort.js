'use strict';

module.exports = function(app) {
	var mongo = require('mongodb').MongoClient;
	var url = 'mongodb://localhost';
	var givenUrl;
	
	mongo.connect(url, function(err, db) {	
		if(err) throw err;
		console.log('Connected to server');
	db.close;
	});
	
	app.route('/:url')
	.get(function(req, res) {
		//check if exists
		mongo.connect(url, function(err, db){
			if(err) throw err;
			var collection = db.collection("urls");
			
			//if exists redirect else send message
			collection.findOne({
				"original": process.argv[2]
			}, function(err, result) {
				if(err) throw err;
				
				if(result) {
					console.log(result);
					res.end("Finished");
				} else {
					res.send("This url is not in the databse");
				}
			});
			
			db.close();
		});
		
	});
	
	app.route('/new/:url*')
	.get(function(req, res) {
		
		var temp;
		var clientUrl = req.originalUrl.substring(5);
		console.log(clientUrl);
		//check if valid
		if(validUrl(clientUrl)) {
			console.log("valid");
			//if valid check if exists
			mongo.connect(url, function(err, db) {
				if(err) throw err;
				var collection = db.collection("urls");
				
				
				collection.findOne({
					"original": url
				}, function(err, data){
					if(err) throw err;
					if(!data) { //if doesn't exist
						//create url
						console.log("Creating url");
						data = "Some new data";
					}
					
					temp = data;
					
				});
				
				
				
				db.close();
			});
			
			//send json
		} else {
			console.log('not valid');
			//if not valid send empty json/message
		}
		
		console.log(temp);
		res.send(temp);
		
		
	});
	
	  function validUrl(url) {
	    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	    return regex.test(url);
	  }
};
