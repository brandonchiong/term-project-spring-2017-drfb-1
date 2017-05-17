const db = require( '../connect' )

const ALL = `SELECT * FROM GameCards`
const GETCARDSBYPLAYER = `SELECT * FROM GameCards WHERE game_id=$1 AND user_id=$2`
const DELETEPLAYER = `DELETE FROM GameCards WHERE game_id=$1 AND user_id=$2 RETURNING *`
const DELETEGAME = 'DELETE FROM GameCards WHERE game_id=$1 RETURNING *'
const CARDTOPLAYER = 'UPDATE GameCards SET user_id=$1 WHERE game_id=$2 AND card_id=$3'
const GETNUMCARDSINDECK = 'SELECT COUNT (*) AS numCards FROM GameCards WHERE game_id=$1 AND user_id=1'
const GETNUMCARDSBYPLAYER = 'SELECT COUNT (*) AS numCards FROM GameCards WHERE game_id=$1 AND user_id=$2'
const DRAWCARDBYPLAYERID = 'UPDATE GameCards SET user_id=$1 ' + 
                           'WHERE game_id=$2 AND card_id '+ 
                           'IN (SELECT card_id FROM ' +
                           'GameCards WHERE game_id =$2 AND user_id=1 AND discarded=false ORDER BY random() LIMIT 1) RETURNING *'
const PLAYCARD = 'UPDATE GameCards SET discarded=true, discarded_at=$4, user_id=1 ' + 
                 'WHERE game_id=$1 AND user_id=$2 AND card_id=$3 RETURNING card_id'
const RESET = 'UPDATE GameCards SET discarded=false, discarded_at=\'2017-05-17 00:00:00\', user_id=1 WHERE game_id=$1 AND discarded=true AND user_id=1'
const DRAWTOPCARD = 'UPDATE GameCards SET discarded = true, user_id = 1, discarded_at = $2 '+ 
                   'WHERE game_id = $1 AND card_id ' + 
                   'IN (SELECT card_id FROM GameCards ' + 
                   'WHERE game_id = $1 AND user_id = 1 '+
                   'AND discarded = false ORDER BY random() LIMIT 1) RETURNING *'
const NEWDECK = 'INSERT INTO GameCards (game_id, card_id, user_id, discarded_at, discarded) VALUES ' +
                '($1, 0, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 1, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 2, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 3, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 4, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 5, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 6, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 7, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 8, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 9, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 10, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 11, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 12, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 13, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 14, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 15, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 16, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 17, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 18, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 19, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 20, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 21, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 22, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 23, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 24, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 25, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 26, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 27, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 28, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 29, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 30, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 31, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 32, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 33, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 34, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 35, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 36, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 37, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 38, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 39, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 40, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 41, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 42, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 43, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 44, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 45, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 46, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 47, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 48, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 49, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 50, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 51, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 52, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 53, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 54, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 55, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 56, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 57, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 58, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 59, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 60, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 61, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 62, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 63, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 64, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 65, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 66, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 67, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 68, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 69, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 70, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 71, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 72, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 73, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 74, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 75, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 76, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 77, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 78, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 79, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 80, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 81, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 82, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 83, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 84, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 85, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 86, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 87, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 88, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 89, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 90, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 91, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 92, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 93, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 94, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 95, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 96, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 97, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 98, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 99, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 100, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 101, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 102, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 103, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 104, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 105, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 106, 1, \'2017-05-17 00:00:00\', false), '+
                '($1, 107, 1, \'2017-05-17 00:00:00\', false)'


                 
module.exports = {
   all: () => db.any( ALL ),
   getCardsByPlayer: ( game_id, user_id ) => db.any( GETCARDSBYPLAYER, [ game_id, user_id ] ),
   newDeck: (game_id) => db.any( NEWDECK, game_id ),
   deletePlayer: ( game_id, user_id ) => db.one( DELETEPLAYER, [ game_id, user_id ] ),
   deleteGame: game_id => db.one( DELETEGAME, game_id),
   cardToPlayer: ( game_id, card_id, user_id ) => db.one( CARDTOPLAYER, [ game_id, card_id, user_id] ),
   getNumCardsInDeck: (game_id) => db.any(GETNUMCARDSINDECK, game_id),
   getNumCardsByPlayer: (game_id, user_id) => db.any(GETNUMCARDSBYPLAYER, [game_id, user_id]),
   drawCardByPlayerId: (user_id, game_id) => db.one(DRAWCARDBYPLAYERID,[ user_id, game_id ] ),
   playCard: (game_id, user_id, card_id, time) => db.one(PLAYCARD, [ game_id, user_id, card_id, time ]) ,//---> Games.setTopCard(result.card_id)
   reset: game_id => db.any(RESET, game_id),
   drawTopCard :(game_id, time)=> db.one(DRAWTOPCARD, [ game_id, time ]) //---> Games.setTopCard(result.card_id)
                
       
}
