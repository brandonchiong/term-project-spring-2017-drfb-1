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

    socket.on('join_game', data => {
      console.log('SOCKET: Player joined the game!')
    })

    // socket.on( 'get-deck', function())

  })
}

module.exports = { init }
