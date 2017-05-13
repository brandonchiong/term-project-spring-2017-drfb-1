var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	var username = req.user.alias;

	console.log(username + ' joined the game');

  res.render('game', { title: 'Game' });
});

module.exports = router;
