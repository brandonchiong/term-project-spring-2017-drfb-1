const express = require('express')
const router = express.Router()

const { Cards } = require('../db')
const { Users } = require('../db')
const { Games } = require('../db')
const { GameUsers } = require('../db')
const { GameCards } = require('../db')

router.get('/', (request, response) => {
    var userId, gameId = 3, done = true
/*
    GameCards.drawTopCard(gameId, '2017-05-17 00:00:00')
             .then( results => {
                      console.log('top card set to card id: ', results.card_id) 
                      Games.setTopCard(gameId, results.card_id)
                      response.render('test')
                  })
             .catch( error => {
                      console.log(error)
                  })
                  */

    Users.all(  )
       .then(results => {
           results.forEach(function(element) {
              console.log('Results of pg-promise user id: ' , element.id, element.alias, element.email, element.pw)
           }, this);
           response.render('test', { results })
       })
       .catch( error => {
           response.render('gameLobby')
       })

    
    Users.createUser('Joker', 'mrJay@arkham.gov', 'PASSWORD')
        .then(results => {
            userId = results.id
            console.log('User created with id: ', userId)
            
            Users.getUser_by_alias('Joker')
                 .then(results => {
                     console.log('Using alias to find user with result: ', results.id, results.email, results.pw)
            })
            Users.getPw_By_Alias('Joker')
                 .then(results => {
                    console.log('Using alias to find pw: ', results.pw)
            })
            Games.create( userId )
                 .then( (results ) => {
                      gameId = results.id
                      console.log('Created game with host: ', userId, ' and game id: ', gameId)
                      GameUsers.create(gameId, userId, false, 0)
                               .then( results => {
                                   console.log('GameUsers populated with gameid: ', gameId, ' userid: ', userId)
                                GameCards.newDeck(gameId)
                                         .then( results => {
                                             console.log('New deck in play')
                                         GameCards.drawTopCard(gameId, '2017-05-17 00:00:00')
                                                  .then( results => {
                                                      console.log('top card set to card id: ', results.card_id) 
                                                  Games.setTopCard(gameId, results.card_id)
                                         })
                                                 .catch( error => {
                                                       console.log(error)
                                         })
                                })   
                      })
           })
   })
  



          
})

module.exports = router
