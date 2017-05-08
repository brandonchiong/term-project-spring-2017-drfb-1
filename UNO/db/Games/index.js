const db = require( '../connect' )

const ALL = `SELECT * FROM Games`
const FIND = `SELECT * FROM Games WHERE id=$1`
const CREATE = `INSERT INTO Games ( top_card_id, direction, player_turn ) VALUES ( $1, $2, $3 ) RETURNING id`
const DELETE = `DELETE FROM Games WHERE id = $1`

module.exports = {
   all: () => db.any( ALL ),
   find: id => db.oneOrNone( FIND, id ),
   create: ( top_card_id, direction, player_turn ) => db.oneOrNone( CREATE, [ top_card_id, direction, player_turn ] ),
   delete: id => db.none( DELETE, id ),
}
