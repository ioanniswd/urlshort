'use strict';

module.exports = function(app) {
	var validUrl = require('valid-url');
	
	
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
