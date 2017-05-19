var express = require('express');
var router = express.Router();

const { GameUsers } = require('../db');
const { GameCards } = require('../db');
const { Cards } = require('../db');

router.post('/', function(req, res, next) {

  var gameid = req.body.gameid;

  res.redirect("game/" + gameid);

});

router.get('/:id', function(req, res, next) {

  console.log('URL: ' + req.originalUrl);
  var gameid = req.originalUrl.split("/")[2];
  console.log('GAME ID: ' + gameid);

  if(req.user) {
    var userid = req.user.id;
    var username = req.user.alias;
    console.log(userid + ':' + username + ' joined game ' + gameid);

    Cards.all().then(cards => {
      res.render('game', {
        cards, 
        userid : userid, 
        username : username,
        gameid : gameid
      });
    })
  } else {
    res.redirect('/');
  }

});

module.exports = router;
