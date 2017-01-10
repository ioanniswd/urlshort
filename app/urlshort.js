'use strict';

module.exports = function(app) {
	var validUrl = require('valid-url');
	var mongo = require('mongodb');
	var url = 'mongodb://localhost';
	var insertDocs = function(db) {
		var collection = db.collection('urls');
		collection.insertMany([{a:1}, {a:2}, {a:3} ]);
	};
	
	mongo.MongoClient.connect(url, function(err, db) {	
		console.log('Connected to server');
		insertDocs(db);
		
		console.log(db.listCollections());
	db.close;
	});
	
	app.route('/:url')
	.get(function(req, res) {
		//check if exists
		//if exists redirect else send message
	});
	
	app.route('/new/:url')
	.get(function(req, res) {
		var url = req.originalUrl;
		console.log(url);
		//check if valid
		if(validUrl.isUri(url)) {
			console.log("valid");
			//if valid check if exists
			//if not create short url
			//send json
		} else {
			console.log('not valid');
			//if not valid send empty json/message
		}
		
		res.end();
		
		
	});
};
