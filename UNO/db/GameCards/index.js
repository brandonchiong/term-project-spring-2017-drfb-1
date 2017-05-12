const db = require( '../connect' )

const ALL = `SELECT * FROM GameCards`
const GETCARDSBYPLAYER = `SELECT * FROM GameCards WHERE game_id=$1 AND user_id=$2`
const CREATE = `INSERT INTO GameCards VALUES `//TODO: assign all cards to user_id=0
const DELETEPLAYER = `DELETE FROM GameCards WHERE game_id=$1 AND user_id=$2 RETURNING *`
const DELETEGAME = 'DELETE FROM GameCards WHERE game_id=$1 RETURNING *'
//const CARDTOPLAYER = 'UPDATE GameCards SET user_id=$1 WHERE game_id=$2 AND card_id=$3'
const GETNUMCARDSINDECK = 'SELECT COUNT (*) AS numCards FROM GameCards WHERE game_id=$1 AND user_id=0'
const GETNUMCARDSBYPLAYER = 'SELECT COUNT (*) AS numCards FROM GameCards WHERE game_id=$1 AND user_id=$2'
const DRAWCARDBYPLAYERID = 'UPDATE GameCards gc, GameUsers gu SET gc.user_id=$1, gu.num_cards = gu.num_cards +1 ' + 
                           'WHERE gc.game_id=$2 AND gu.game_id=$2 AND gu.user_id=$1 AND gc.card_id '+ 
                           'IN (SELECT card_id FROM' +
                           ' GameCards WHERE game_id =$2 AND user_id=0 ORDER BY random() LIMIT 1) RETURNING *'
const PLAYCARD = 'UPDATE GameCards gc, GameUsers gu SET gc.discarded=true, gc.discarded_at=$4, gc.user_id=-1, gu.num_cards= gu.num_cards -1 ' + 
                 'WHERE gc.game_id=$1 AND gu.game_id=$1 AND gc.user_id=$2 AND gu.user_id=$2 AND gc.card_id=$3'
const RESET = 'UPDATE GameCards SET discarded=false, discarded_at=0, user_id=0 WHERE game_id=$1 AND discarded=true AND card_id=-1'
const SETTOPCARD = 'UPDATE GameCards gc, Game g SET gc.discarded =true, gc.user_id=-1, g.top_card=$2, gc.discarded_at=$3, '+ 
                   'WHERE gc.game_id=$1 AND g.id=$1 AND gc.card_id ' + 
                   'IN (SELECT card_id FROM GameCards WHERE game_id =$1 AND user_id=0 ORDER BY random() LIMIT 1) RETURNING *'
module.exports = {
   all: () => db.any( ALL ),
   getCardsByPlayer: ( game_id, user_id ) => db.any( GETCARDSBYPLAYER, [ game_id, user_id ] ),
   create: game_id => db.one( CREATE, game_id ),
   deletePlayer: ( game_id, user_id ) => db.one( DELETEPLAYER, [ game_id, user_id ] ),
   deleteGame: game_id => db.one( DELETEGAME, game_id),
   //cardToPlayer: ( game_id, card_id, user_id ) => db.one( CARDTOPLAYER, [ game_id, card_id, user_id] ),
   getNumCardsInDeck: (game_id) => db.any(GETNUMCARDSINDECK, game_id),
   getNumCardsByPlayer: (game_id, user_id) => db.any(GETNUMCARDSBYPLAYER, [game_id, user_id]),
   drawCardByPlayerId: (user_id, game_id) => db.one(DRAWCARDBYPLAYERID,[ user_id, game_id ] ),
   playCard: (game_id, user_id, card_id, time) => db.one(PLAYCARD, [ game_id, user_id, card_id, time ]),
   reset: game_id => db.any(RESET, game_id),
   setTopCard: (game_id, card_id, time) => db.one(SETTOPCARD, [ game_id, card_id, time] ),
}
