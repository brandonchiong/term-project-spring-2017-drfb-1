const express = require('express');
const router = express.Router();
const { Games } = require('../db');
const { GameCards } = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {

	if(req.user) {
		
		var username = req.user.alias;

		console.log(username + ' joined the lobby');

		Games.all()
  			.then(games => {
  				res.render('gameLobby', {games});
  		})

  } else {
  	res.redirect('/');
  }

});

router.post('/', function(req, res, next) {

	var username = req.user.alias;
	console.log('CREATING GAME')
  
	Games.create(1)
  GameCards.newDeck(1)
  
		.then(games => {
			var gameid = games.id;
			console.log('GAME CREATED by ' + username);
			res.redirect('game');
		})
});

router.post('/joinGame', function(req, res, next) {

	var username = req.user.alias;
	console.log(username + 'joined the game');

	res.redirect('game');
});


module.exports = router;