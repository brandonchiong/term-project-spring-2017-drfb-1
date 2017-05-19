const socketIo = require( 'socket.io' )

const { USER_JOINED, MESSAGE_SEND } = require( '../src/constants/events' )
const { Games } = require('../db')
const { Cards } = require('../db');
const { GameCards } = require('../db');
const gameid = 1
const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  io.on( 'connection', socket => {
    console.log( 'client connected' )

    socket.on( 'disconnect', data => {
      console.log( 'client disconnected' )
    })

    socket.on( USER_JOINED, data => io.emit( USER_JOINED, data ))
    socket.on( MESSAGE_SEND, data => io.emit( MESSAGE_SEND, data ))

    socket.on('join_game', function(userData) {
      console.log('SOCKET: ' + userData.userid + ':' + userData.username + ' joined the game!')
    })

    socket.on('draw_card', function(userData) {
      console.log(userData.username + " drew a card!" )
      
      GameCards.drawCardByPlayerId(userData.userid, 1)
        .then(gamecards => {
          Cards.find(gamecards.card_id)
          .then(cardpaths => {
            socket.emit('draw_card', gamecards, cardpaths);
            console.log(cardpaths);
          })
          
          console.log(gamecards.card_id);
        })
        .catch(err => {
          console.log(err)
        })
    })

    
    socket.on('play_card', function(userData){
      GameCards.playCard(gameid, userData.userid, INSERT_CARD_ID).then( card =>{
        console.log('Played card id: ', card.card_id)
        Games.setTopCard(gameid, card.card_id).then( topcard => { console.log('Top card set to id:', card.card_id)})
        
        Cards.getCardImg(card.card_id).then(cardpaths => {
          socket.emit('draw_top_card', card, cardpaths)
        })
      })
       .catch(err => { console.log(err)})
    })
  })  
}

module.exports = { init }
