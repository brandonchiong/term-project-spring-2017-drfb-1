const express = require('express')
const router = express.Router()

const { Cards } = require('../db')
const { Users } = require('../db')
const { Games } = require('../db')
const { GameUsers } = require('../db')
const { GameCards } = require('../db')

router.get('/', (request, response) => {
    var userId, gameId = 3, done = true

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
/*
      //Gets the current number of cards the player with id 2 has in the game with id 1
      GameCards.getNumCardsByPlayer(1, 2)
        .then( results => {
            console.log('Joker has ' + results[0].num + ' cards')
        })
*/

/*
        //Gets the number of cards in the deck that players will draw from.
        GameCards.getNumCardsInDeck(1)
          .then( results => {
              console.log( 'Deck has ' + results[0].num + ' cards')
          })
*/

/*
    //Returns the number of players in game having id 1
    Games.getNumPlayers(1)
       .then( results => {
           console.log('There are ' + results[0].num + ' players in this game')
       })
 */     
      /*
      //All cards currently indiscard pile are put back in the deck proper.
       GameCards.reset(1)
          .then( () => {
              console.log('cards reset')
          })
      */

       /*
       //A player in game 1 with id 2 plays card with id 47
       GameCards.playCard(1,2,47)
          .then( results => {
              console.log('Joker played ', results.card_id)
              Games.setTopCard(1, results.card_id)
          })
       */

       /*
       //User with id 4 is added to game with id 1 
       GameUsers.addPlayer(1, 4)
            .then(results => {
                console.log('Added player: ' + 4)
            })
       */

  /*  
   //Created a fake user and added to game with id 1
   Users.createUser("faker4", "fake@faker4", "password")
        .then( results => {
            console.log ('created user with id: ' , results.id)
            GameUsers.addPlayer(1, results.id)
              .then( results => {
                  console.log("Successfully added player to game.")
              })
        })
    */
/*
    //Deletes user with id 8 from game with id 1
    GameUsers.delete(1, 8)
       .then( results => {
           console.log('Deleted user from game')
       })  
*/
/*
    //Create a new user
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
            //Create new Game
            Games.create( userId )
                 .then( (results ) => {
                      gameId = results.id
                      console.log('Created game with host: ', userId, ' and game id: ', gameId)
                      //Create new GameUsers 
                      GameUsers.create(gameId, userId, false, 0)
                               .then( results => {
                                   console.log('GameUsers populated with gameid: ', gameId, ' userid: ', userId)
                                //Deal cards to Default user = 1 
                                GameCards.newDeck(gameId)
                                         .then( results => {
                                             console.log('New deck in play')
                                         //Draw the first card 
                                         GameCards.drawTopCard(gameId, '2017-05-17 00:00:00')
                                                  .then( results => {
                                                      console.log('top card set to card id: ', results.card_id) 
                                                      //Update topcard value in Games Table
                                                      Games.setTopCard(gameId, results.card_id)
                                         })
                                                 .catch( error => {
                                                       console.log(error)
                                         })
                                })   
                      })
           })
   })   
   */  
})

module.exports = router
