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

	console.log('creating game')
	Games.create(-1, true, 0)
		.then(games => {
			var gameid = games.id;
			console.log('game created');
			res.render('game', { title: 'Game' });
		})

});

module.exports = router;