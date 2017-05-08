const db = require( '../connect' )

const ALL = `SELECT * FROM GameCards`
const FIND = `SELECT * FROM GameCards WHERE game_id=$1 AND card_id=$2 AND user_id=$3`
const CREATE = `INSERT INTO GameCards ( game_id, card_id, user_id, discarded_at, discarded ) VALUES ( $1, $2, $3, $4, $5 )`
const DELETE = `DELETE FROM GameCards WHERE game_id=$1 AND card_id=$2 AND user_id=$3`

module.exports = {
   all: () => db.any( ALL ),
   find: ( game_id, card_id, user_id ) => db.oneOrNone( FIND, [ game_id, card_id, user_id ] ),
   create: ( first_name, last_name, alias, email, pw ) => db.none( CREATE, [ first_name, last_name, alias, email, pw ] ),
   delete: ( game_id, card_id, user_id ) => db.none( DELETE, [ game_id, card_id, user_id ] ),
}
