const socketIo = require( 'socket.io' )

const { USER_JOINED, MESSAGE_SEND } = require( '../src/constants/events' )

const { GameCards } = require('../db');

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
          socket.emit('draw_card', gamecards);
          console.log(gamecards);
        })
        .catch(err => {
          console.log(err)
        })
    })
  })  
}

module.exports = { init }
