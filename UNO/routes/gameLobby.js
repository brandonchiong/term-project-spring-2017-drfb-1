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

	console.log('CREATING GAME')
	Games.create(0, true, 1)
		.then(games => {
			var gameid = games.id;
			console.log('GAME CREATED');
			res.redirect('game');
		})


});

module.exports = router;