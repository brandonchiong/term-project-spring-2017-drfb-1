var express = require('express');
var router = express.Router();

const { GameUsers } = require('../db');
const { GameCards } = require('../db');
const { Cards } = require('../db');

router.get('/', function(req, res, next) {

	if(req.user) {
		var username = req.user.alias;
		console.log(username + ' joined the game');

  	Cards.all().then(cards => {
      res.render('game', {cards} );
    })
  } else {
  	res.redirect('/');
  }
});

module.exports = router;
