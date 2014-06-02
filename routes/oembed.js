var express = require('express');
var https = require('https');
var router = express.Router();


/* Displays the embedded tweet. */
router.get('/:tweetid', function(req, res) {
	var tweetid = req.params.tweetid;
	if (!tweetid) {
		res.render('error', {error: "Missing Tweet ID"});
	} else {
	    var optionsget = {
	    	host: 'api.twitter.com',
	    	port: 443,
	    	path: '/1/statuses/oembed.json?id=' + tweetid,
	    	method: 'GET'
	    }
	    https.get(optionsget, function(res2) {
	    	var body = '';
	    	res2.on('data', function(chunk) {
	    		body += chunk;
	    	});
	    	res2.on('end', function() {
	    		console.log(body);

	    		var jsonObj = JSON.parse(body);
	    		//console.log(jsonObj.html);

	    		res.render('oembed', 
	    			{ title: "Embedded Tweet",
	    		      tweetid: tweetid,
	    		      twitterid: jsonObj.author_name,
	    		  	  body: jsonObj.html});
	    	});
	    }).on('error', function(e) {
	    	res.render('error', { error: e});
	    });
	}
});

module.exports = router;
