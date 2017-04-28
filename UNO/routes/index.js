var express = require('express');
var router = express.Router();

var passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/gameLobby',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

module.exports = router;
