var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/gameLobby',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

module.exports = router;
