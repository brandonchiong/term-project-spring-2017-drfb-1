const db = require( '../connect' )

const ALL = `SELECT * FROM Messages`
const FIND_BY_GAME_ID = `SELECT message, time_stamp FROM Messages WHERE game_id=$1`
const CREATE = `INSERT INTO Messages ( game_id, user_id, message, time_stamp ) VALUES ( $1, $2, $3, $4 )`

module.exports = {
   all: () => db.any( ALL ),
   find_by_game_id: game_id => db.any( FIND_BY_GAME_ID, game_id ),
   create: ( game_id, user_id, message, time_stamp ) => db.none( CREATE, [ game_id, user_id, message, time_stamp ] ),
}
