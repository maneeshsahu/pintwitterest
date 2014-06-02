var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// Redirect to the favorites page
    res.redirect('/favorites/');
});

module.exports = router;
