const db = require( '../connect' )

const ALL = `SELECT * FROM GameCards`
const GETCARDSBYPLAYER = `SELECT * FROM GameCards WHERE game_id=$1 AND user_id=$2`
const DELETEPLAYER = `DELETE FROM GameCards WHERE game_id=$1 AND user_id=$2 RETURNING *`
const DELETEGAME = 'DELETE FROM GameCards WHERE game_id=$1 RETURNING *'
const CARDTOPLAYER = 'UPDATE GameCards SET user_id=$1 WHERE game_id=$2 AND card_id=$3'
const GETNUMCARDSINDECK = 'SELECT COUNT (*) AS numCards FROM GameCards WHERE game_id=$1 AND user_id=0'
const GETNUMCARDSBYPLAYER = 'SELECT COUNT (*) AS numCards FROM GameCards WHERE game_id=$1 AND user_id=$2'
const DRAWCARDBYPLAYERID = 'UPDATE GameCards SET user_id=$1 ' + 
                           'WHERE game_id=$2 AND card_id '+ 
                           'IN (SELECT card_id FROM ' +
                           'GameCards WHERE game_id =$2 AND user_id=0 AND discarded=false ORDER BY random() LIMIT 1) RETURNING *'
const PLAYCARD = 'UPDATE GameCards SET discarded=true, discarded_at=$4, user_id=0 ' + 
                 'WHERE game_id=$1 AND user_id=$2 AND card_id=$3'
const RESET = 'UPDATE GameCards SET discarded=false, discarded_at=0, user_id=0 WHERE game_id=$1 AND discarded=true AND user_id=0'
const SETTOPCARD = 'UPDATE GameCards discarded =true, user_id=0, top_card=card_id, discarded_at=$3, '+ 
                   'WHERE game_id=$1 AND card_id ' + 
                   'IN (SELECT card_id FROM GameCards WHERE game_id =$1 AND user_id=0 AND discarded=false ORDER BY random() LIMIT 1) RETURNING *'
const NEWDECK = 'INSERT INTO GameCards (game_id, card_id, user_id, discarded_at, discarded) VALUES ' +
                '($1, 0, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 1, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 2, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 3, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 4, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 5, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 6, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 7, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 8, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 9, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 10, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 11, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 12, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 13, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 14, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 15, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 16, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 17, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 18, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 19, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 20, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 21, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 22, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 23, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 24, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 25, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 26, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 27, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 28, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 29, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 30, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 31, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 32, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 33, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 34, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 35, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 36, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 37, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 38, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 39, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 40, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 41, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 42, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 43, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 44, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 45, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 46, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 47, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 48, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 49, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 50, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 51, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 52, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 53, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 54, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 55, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 56, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 57, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 58, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 59, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 60, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 61, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 62, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 63, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 64, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 65, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 66, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 67, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 68, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 69, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 70, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 71, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 72, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 73, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 74, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 75, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 76, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 77, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 78, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 79, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 80, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 81, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 82, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 83, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 84, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 85, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 86, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 87, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 88, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 89, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 90, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 91, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 92, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 93, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 94, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 95, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 96, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 97, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 98, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 99, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 100, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 101, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 102, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 103, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 104, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 105, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 106, 0, \'2017-05-17 00:00:00\', false ), '+
                '($1, 107, 0, \'2017-05-17 00:00:00\', false )'


                 
module.exports = {
   all: () => db.any( ALL ),
   getCardsByPlayer: ( game_id, user_id ) => db.any( GETCARDSBYPLAYER, [ game_id, user_id ] ),
   newDeck: (game_id) => db.one( NEWDECK, game_id ),
   deletePlayer: ( game_id, user_id ) => db.one( DELETEPLAYER, [ game_id, user_id ] ),
   deleteGame: game_id => db.one( DELETEGAME, game_id),
   cardToPlayer: ( game_id, card_id, user_id ) => db.one( CARDTOPLAYER, [ game_id, card_id, user_id] ),
   getNumCardsInDeck: (game_id) => db.any(GETNUMCARDSINDECK, game_id),
   getNumCardsByPlayer: (game_id, user_id) => db.any(GETNUMCARDSBYPLAYER, [game_id, user_id]),
   drawCardByPlayerId: (user_id, game_id) => db.one(DRAWCARDBYPLAYERID,[ user_id, game_id ] ),
   playCard: (game_id, user_id, card_id, time) => db.one(PLAYCARD, [ game_id, user_id, card_id, time ]),
   reset: game_id => db.any(RESET, game_id),
   setTopCard: (game_id, card_id, time) => db.one(SETTOPCARD, [ game_id, card_id, time] ),
}
