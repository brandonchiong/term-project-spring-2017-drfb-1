const db = require( '../connect' )

const ALL = `SELECT * FROM Games`
const FIND = `SELECT * FROM Games WHERE id=$1`
const CREATE = `INSERT INTO Games ( direction, player_turn ) VALUES ( true, $1 ) RETURNING id`
const DELETE = `DELETE FROM Games WHERE id = $1`
const GETNUMPLAYERS = 'SELECT COUNT (*) AS num FROM (SELECT DISTINCT user_id FROM GameCards WHERE game_id=$1 AND user_id > 1) AS tmp'

module.exports = {
   all: () => db.any( ALL ),
   find: id => db.oneOrNone( FIND, id ),
   create:  player_turn  => db.oneOrNone( CREATE,  player_turn  ),
   delete: id => db.none( DELETE, id ),
   getNumPlayers: id => db.one( GETNUMPLAYERS, id ),
}
