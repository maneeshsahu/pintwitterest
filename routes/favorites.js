var express = require('express');
var router = express.Router();
var twitter = require('ntwitter');

var twit = new twitter({
	consumer_key: '6SRorR76DP6l89ZLkYvx7dbse',
	consumer_secret: 'oqw59HqpeGxGuYSvoTsG1h5C1vwgKOO6bq21GI4osE57jH137I'
}).verifyCredentials(function(err, data) {
	if (err) {
		console.log("Couldn't validate Twitter Application: " + err);
	}
});

// Default entry
router.get('/', function(req, res) {
	res.redirect('maneeshsahu');
});

/* GET favorites of the user. */
router.get('/:twitterid', function(req, res) {
	var twitterid = req.params.twitterid;
	if (!twitterid) {
		twitterid = "maneeshsahu";
	}

	twit.getFavorites({
		screen_name: twitterid,
		title: "Pintwitterest",
		count: 200
			}, function(err2, data2) {
				if (err2) {
					console.log("Error retrieving favorits: " + err2);
					res.render('error', {error: err2});
				} else {
					console.log(data2);

					res.render('favorites', { twitterid: twitterid,
											  favorites: data2 });
				}

	});

});

module.exports = router;
