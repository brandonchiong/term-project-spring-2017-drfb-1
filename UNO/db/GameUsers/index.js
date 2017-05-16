const db = require( '../connect' )

const ALL = `SELECT * FROM GameUsers`
const FIND_BY_IDS = `SELECT * FROM GameUsers WHERE game_id=$1 AND user_id=$2`
const CREATE = `INSERT INTO GameUsers ( game_id, user_id, uno, num_cards ) VALUES ( $1, $2, $3, $4 ) RETURNING *`
const DELETE = `DELETE FROM GameUsers WHERE game_id = $1 AND user_id=$2`
const GETPLAYERSBYGAMEID = 'SELECT * FROM GameUsers WHERE game_id=$1'
const DECLAREUNO = 'UPDATE GameUsers SET uno=true WHERE game_id=$1 AND user_id=$2'
module.exports = {
   all: () => db.any( ALL ),
   find_by_ids: ( game_id, user_id ) => db.oneOrNone( FIND_BY_IDS, [ game_id, user_id ]),
   create: ( game_id, user_id, uno, num_cards ) => db.one( CREATE, [ game_id, user_id, uno, num_cards ] ),
   delete: ( game_id, user_id ) => db.none( DELETE, [ game_id, user_id ] ),
   getPlayersByGameId: game_id => db.manyOrNone( GETPLAYERSBYGAMEID, game_id),
   declareUno: (game_id, user_id) => db.one( DECLAREUNO, [game_id, user_id]),
}
