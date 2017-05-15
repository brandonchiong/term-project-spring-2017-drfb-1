const db = require( '../connect' )

const ALL = `SELECT * FROM Messages`
const CREATE = `INSERT INTO Messages ( game_id, user_id, message, time_stamp ) VALUES ( $1, $2, $3, $4 )`
const GETGAMEMSGS = 'SELECT * FROM Messages WHERE game_id=$1'
const GETGAMEMSGSPASTTIME = 'SELECT message FROM Messages WHERE time >= time_stamp'
const GETLOBBYMSGS = 'SELECT * FROM Messages WHERE game_id=0'
const GETLOBBYMSGSPASTTIME = 'SELECT message FROM Messages WHERE time >= time_stamp'
module.exports = {
   all: () => db.any( ALL ),
   create: ( game_id, user_id, message, time_stamp ) => db.none( CREATE, [ game_id, user_id, message, time_stamp ] ),
   getGameMsgs: game_id => db.any(GETGAMEMSGS, game_id),
   getGameMsgsPastTime: game_id => db.any(GETGAMEMSGSPASTTIME, game_id),
   getLobbyMsgs: () => db.any(GETLOBBYMSGS),
   getLobbyMsgsPastTime: time => db.any(GETLOBBYMSGSPASTTIME, time),
}
