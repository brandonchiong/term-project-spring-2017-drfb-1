const express = require('express');
const router = express.Router();


router.post('/', function(req, res, next) {

	res.redirect('game');
});

router.post('/:id', function(req, res, next) {

	console.log('URL: ' + req.originalUrl);
	var gameid = req.originalUrl.split("/")[2]
  console.log('GAME ID: ' + gameid);

	res.redirect('game');	
});

module.exports = router;