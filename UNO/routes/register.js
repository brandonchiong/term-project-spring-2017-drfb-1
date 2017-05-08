var express = require('express');
var router = express.Router();

const users = require('../db/Users/index.js');

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	users.create(username, username, username, email, password)
	.then(() => {
		res.render('/login');
	})
	.catch(error => {
		console.log(error)
	});
});

module.exports = router;