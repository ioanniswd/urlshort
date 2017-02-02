'use strict';

module.exports = function(app) {
	var Promise = require('promise');
	var mongo = require('mongodb').MongoClient;
	//var url = "process.env.MONGOLAB_URI";
	var url = 'mongodb://localhost/test';
	var randomstring = require("randomstring");
	
	mongo.connect(url, function(err, db) {	
		if(err) throw err;
		console.log('Connected to server');
	db.close;
	});
	
	app.route('/:shortUrl')
	.get(function(req, res) {
		//check if exists
		mongo.connect(url, function(err, db){
			if(err) throw err;
			var collection = db.collection("urls");
			
			//if exists redirect else send message
			collection.findOne({
				"short": { $eq: req.params.shortUrl}
			}, function(err, result) {
				if(err) throw err;
				
				if(result) {
					console.log(result.original);
					res.redirect(result.original);
				} else {
					res.send("This url is not in the databse");
				}
			});
			
			db.close();
		});
		
	});
	
	app.route('/new/:url*')
	.get(function(req, res) {
		
	
		var clientUrl = req.originalUrl.substring(5);
		console.log(clientUrl);
		
		//check if valid
		if(validUrl(clientUrl)) {
			console.log("valid");			
			
			mongo.connect(url, function(err, db) {
				if(err) throw err;
				console.log(url);
				var collection = db.collection("urls");			
				
				var urlObj;
				var result = collection.findOne({"original": clientUrl});
				
				result.then(function(result) {
					
					if(result) {
						console.log("Found in db");
						urlObj = result;
					} else {
						console.log("Not in the db. Creating...");
						urlObj = {"original": clientUrl, "short": randomstring.generate(6)};
						collection.save(urlObj, function(err, result) {
							if(err) throw err;
							
							console.log("Added " + result);
						});
						console.log(urlObj);
						db.close();
					}
					res.json({"original": urlObj.original, "short": urlObj.short});
					
				}).catch(function(reason) {
					console.log(reason);
					res.end(reason);
				});
				
				
			});
			
		} else {
			console.log('not valid url');
			//if not valid send empty message
			res.send("Not valid url");
		}
		
		
		
	});
	
	  function validUrl(url) {
	    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	    return regex.test(url);
	  }
};
