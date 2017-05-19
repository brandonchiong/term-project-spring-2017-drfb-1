const db = require( '../connect' )

const ALL = `SELECT * FROM Games`
const FIND = `SELECT * FROM Games WHERE id=$1`
const CREATE = `INSERT INTO Games ( direction, player_turn ) VALUES ( true, $1 ) RETURNING id`
const CREATETEST = `INSERT INTO Games ( id, direction, player_turn ) VALUES ( 1, true, $1 ) RETURNING id`
const DELETE = `DELETE FROM Games WHERE id = $1`
const DELETEPLAYER = 'DELETE FROM Games WHERE player_turn=$1'
const GETNUMPLAYERS = 'SELECT COUNT (*) AS num '+
                      'FROM (SELECT DISTINCT user_id '+ 
                             'FROM GameCards '+
                             'WHERE game_id=$1 AND user_id > 1) AS tmp'//Default user_id =1
const GETTOPCARD = 'SELECT top_card FROM Games WHERE id=$1'
const GETPLAYERTURN = 'SELECT player_turn FROM Games WHERE id=$1'
const SETTOPCARD = 'UPDATE Games SET top_card = $2 WHERE id=$1 RETURNING *'
const SETPLAYERTURN = 'UPDATE Games SET player_turn=$2 WHERE id=$1 RETURNING *'
module.exports = {
   all: () => db.any( ALL ),
   find: id => db.oneOrNone( FIND, id ),
   create:  player_turn  => db.oneOrNone( CREATE,  player_turn  ),
   createTest: player_turn => db.oneOrNone( CREATETEST,  player_turn  ),
   delete: id => db.none( DELETE, id ),
   deletePlayer: id => db.none(DELETEPLAYER, id),
   getNumPlayers: id => db.any( GETNUMPLAYERS, id ),
   getTopCard: id => db.one(GETTOPCARD, id),
   setTopCard: (id, card_id) => db.one( SETTOPCARD, [id, card_id]),
   setPlayerTurn: (id, user_id) => db.one(SETPLAYERTURN, [id, user_id]),
}
