const express = require('express');
const router = express.Router();
const { Games } = require('../db')


router.get('/', function(req, res, next) {
  Games.all()
      .then(games => {
           res.render( 'gameLobby', {games})
      })
});

module.exports = router;