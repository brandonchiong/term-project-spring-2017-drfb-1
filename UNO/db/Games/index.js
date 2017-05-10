const db = require( '../connect' )

const ALL = `SELECT * FROM Games`
const FIND = `SELECT * FROM Games WHERE id=$1`
const CREATE = `INSERT INTO Games ( top_card_id, direction, player_turn ) VALUES ( $1, $2, $3 ) RETURNING id`
const DELETE = `DELETE FROM Games WHERE id = $1`
const NUM_PLAYERS = 'SELECT COUNT * FROM  GameUsers gu, Games g WHERE gu.game_id=$1 AND g.id=$1' 
module.exports = {
   all: () => db.any( ALL ),
   find: id => db.oneOrNone( FIND, id ),
   create: ( top_card_id, direction, player_turn ) => db.oneOrNone( CREATE, [ top_card_id, direction, player_turn ] ),
   delete: id => db.none( DELETE, id ),
   num_players: (game_id) => db.any( NUM_PLAYERS, [ game_id ] ),
}
