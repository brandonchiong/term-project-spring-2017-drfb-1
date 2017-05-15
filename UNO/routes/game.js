var express = require('express');
var router = express.Router();

const { GameUsers } = require('../db');
const { GameCards } = require('../db');
const { Cards } = require('../db');

router.get('/', function(req, res, next) {

	var username = req.user.alias;

	console.log(username + ' joined the game');

  res.render('game', { title: 'Game' });
});

module.exports = router;
