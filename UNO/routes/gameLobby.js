const express = require('express');
const router = express.Router();
const { Games } = require('../db');
const { GameCards } = require('../db');
const { GameUsers } = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {

    if (req.user) {

        var username = req.user.alias;

        console.log(username + ' joined the lobby');

        Games.all()
            .then(games => {
                res.render('gameLobby', { games });
            })

    } else {
        res.redirect('/');
    }

});

router.post('/', function(req, res, next) {
    //gameid=req.user.id
    var username = req.user.alias, gameid = 1
    console.log('CREATING GAME')

    /*  Games.create(1)
    GameCards.newDeck(1).then(cards => {
            res.render('game', { cards });
            console.log('New Deck initalized');
        })
        .then(games => {
            var gameid = games.id;
            console.log('GAME CREATED by ' + username);
            res.redirect('game');
        })
        
*/
    Games.createTest(req.user.id).then(games => {
       
        console.log('GAME CREATED by ' + username + ' with game id: ' + games.id);
        res.redirect('game')
        GameUsers.addPlayer(gameid, req.user.id).then( gameuser => {
            console.log('GameUser added: ' + req.user.id)
        })
        GameCards.newDeck(games.id).then(cards => {
            res.render('game', { cards });
            console.log('New Deck initalized');
            
            GameCards.drawTopCard(games.id).then(topcard => {
                console.log('Topcard : ', topcard.card_id)
                Games.setTopCard(games.id, topcard.card_id).then(() => { console.log('Top card set in games')})
            })
        })

    })


});

module.exports = router;