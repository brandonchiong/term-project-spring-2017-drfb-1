var express = require('express');
var router = express.Router();

const { Games } = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {

	Games.all()
  		.then(games => {
  			res.render('gameLobby', {games})
  	})
});

router.post('/', function(req, res, next) {
	res.render('game', { title: 'Game' });
});

module.exports = router;