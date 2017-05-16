var express = require('express');
var router = express.Router();

const { GameUsers } = require('../db');
const { GameCards } = require('../db');
const { Cards } = require('../db/Cards/index.js');

router.get('/', function(req, res, next) {

	if(req.user) {
		var username = req.user.alias;
		console.log(username + ' joined the game');

  	// GameCards.newDeck(1).then(cards => {
      res.render('game', {title: 'Game' } );
      consol.log('New Deck initalized');

    // })
    // .catch( error => {
    //   console.log(error);
    // })

  } else {
  	res.redirect('/');
  }

});

module.exports = router;
