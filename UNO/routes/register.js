var express = require('express');
var router = express.Router();

const { Users } = require('../db');

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	Users.create(username, email, password)
	.then(() => {
		res.render('/login');
	})
	.catch(error => {
		console.log(error)
	});
});

module.exports = router;