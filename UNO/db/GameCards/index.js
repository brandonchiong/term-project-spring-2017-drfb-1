const db = require( '../connect' )

const ALL = `SELECT * FROM GameCards`
const GETCARDSBYPLAYER = `SELECT * FROM GameCards WHERE game_id=$1 AND user_id=$2`
const DELETEPLAYER = `DELETE FROM GameCards WHERE game_id=$1 AND user_id=$2 RETURNING *`
const DELETEGAME = 'DELETE FROM GameCards WHERE game_id=$1 RETURNING *'
const CARDTOPLAYER = 'UPDATE GameCards SET user_id=$1 WHERE game_id=$2 AND card_id=$3'
const GETNUMCARDSINDECK = 'SELECT COUNT (*) AS num FROM GameCards WHERE game_id=$1 AND user_id=1'
const GETNUMCARDSBYPLAYER = 'SELECT COUNT (*) AS num FROM GameCards WHERE game_id=$1 AND user_id=$2'

const DRAWCARDBYPLAYERID = 'UPDATE GameCards SET user_id=$1 ' + 
                           'WHERE game_id=$2 AND card_id '+ 
                           'IN (SELECT card_id FROM ' +
                           'GameCards WHERE game_id =$2 AND user_id=1 AND discarded=false '+
                           'ORDER BY random() LIMIT 1) '+
                           'RETURNING *'

const DRAW2CARDSBYPLAYERID = 'UPDATE GameCards SET user_id=$1 ' + 
                             'WHERE game_id=$2 AND card_id '+ 
                             'IN (SELECT card_id FROM ' +
                             'GameCards WHERE game_id =$2 AND user_id=1 AND discarded=false '+
                             'ORDER BY random() LIMIT 2) '+
                             'RETURNING *'

const DRAW4CARDSBYPLAYERID = 'UPDATE GameCards SET user_id=$1 ' + 
                             'WHERE game_id=$2 AND card_id '+ 
                             'IN (SELECT card_id FROM ' +
                             'GameCards WHERE game_id =$2 AND user_id=1 AND discarded=false '+
                             'ORDER BY random() LIMIT 4) '+
                             'RETURNING *'

const PLAYCARD = 'UPDATE GameCards SET discarded=true, user_id=1 ' + 
                 'WHERE game_id=$1 AND user_id=$2 AND card_id=$3 '+
                 'RETURNING card_id'

const RESET = 'UPDATE GameCards SET discarded=false, user_id=1 '+
              'WHERE game_id=$1 AND discarded=true AND user_id=1'

const DRAWTOPCARD = 'UPDATE GameCards SET discarded = true, user_id = 1 '+ 
                   'WHERE game_id = $1 AND card_id ' + 
                   'IN (SELECT card_id FROM GameCards ' + 
                   'WHERE game_id = $1 AND user_id = 1 '+
                   'AND discarded = false ORDER BY random() LIMIT 1) RETURNING *'

const NEWDECK = 'INSERT INTO GameCards (game_id, card_id, user_id, discarded) VALUES ' +
                '($1, 0, 1, false), '+
                '($1, 1, 1, false), '+
                '($1, 2, 1, false), '+
                '($1, 3, 1, false), '+
                '($1, 4, 1, false), '+
                '($1, 5, 1, false), '+
                '($1, 6, 1, false), '+
                '($1, 7, 1, false), '+
                '($1, 8, 1, false), '+
                '($1, 9, 1, false), '+
                '($1, 10, 1, false), '+
                '($1, 11, 1, false), '+
                '($1, 12, 1, false), '+
                '($1, 13, 1, false), '+
                '($1, 14, 1, false), '+
                '($1, 15, 1, false), '+
                '($1, 16, 1, false), '+
                '($1, 17, 1, false), '+
                '($1, 18, 1, false), '+
                '($1, 19, 1, false), '+
                '($1, 20, 1, false), '+
                '($1, 21, 1, false), '+
                '($1, 22, 1, false), '+
                '($1, 23, 1, false), '+
                '($1, 24, 1, false), '+
                '($1, 25, 1, false), '+
                '($1, 26, 1, false), '+
                '($1, 27, 1, false), '+
                '($1, 28, 1, false), '+
                '($1, 29, 1, false), '+
                '($1, 30, 1, false), '+
                '($1, 31, 1, false), '+
                '($1, 32, 1, false), '+
                '($1, 33, 1, false), '+
                '($1, 34, 1, false), '+
                '($1, 35, 1, false), '+
                '($1, 36, 1, false), '+
                '($1, 37, 1, false), '+
                '($1, 38, 1, false), '+
                '($1, 39, 1, false), '+
                '($1, 40, 1, false), '+
                '($1, 41, 1, false), '+
                '($1, 42, 1, false), '+
                '($1, 43, 1, false), '+
                '($1, 44, 1, false), '+
                '($1, 45, 1, false), '+
                '($1, 46, 1, false), '+
                '($1, 47, 1, false), '+
                '($1, 48, 1, false), '+
                '($1, 49, 1, false), '+
                '($1, 50, 1, false), '+
                '($1, 51, 1, false), '+
                '($1, 52, 1, false), '+
                '($1, 53, 1, false), '+
                '($1, 54, 1, false), '+
                '($1, 55, 1, false), '+
                '($1, 56, 1, false), '+
                '($1, 57, 1, false), '+
                '($1, 58, 1, false), '+
                '($1, 59, 1, false), '+
                '($1, 60, 1, false), '+
                '($1, 61, 1, false), '+
                '($1, 62, 1, false), '+
                '($1, 63, 1, false), '+
                '($1, 64, 1, false), '+
                '($1, 65, 1, false), '+
                '($1, 66, 1, false), '+
                '($1, 67, 1, false), '+
                '($1, 68, 1, false), '+
                '($1, 69, 1, false), '+
                '($1, 70, 1, false), '+
                '($1, 71, 1, false), '+
                '($1, 72, 1, false), '+
                '($1, 73, 1, false), '+
                '($1, 74, 1, false), '+
                '($1, 75, 1, false), '+
                '($1, 76, 1, false), '+
                '($1, 77, 1, false), '+
                '($1, 78, 1, false), '+
                '($1, 79, 1, false), '+
                '($1, 80, 1, false), '+
                '($1, 81, 1, false), '+
                '($1, 82, 1, false), '+
                '($1, 83, 1, false), '+
                '($1, 84, 1, false), '+
                '($1, 85, 1, false), '+
                '($1, 86, 1, false), '+
                '($1, 87, 1, false), '+
                '($1, 88, 1, false), '+
                '($1, 89, 1, false), '+
                '($1, 90, 1, false), '+
                '($1, 91, 1, false), '+
                '($1, 92, 1, false), '+
                '($1, 93, 1, false), '+
                '($1, 94, 1, false), '+
                '($1, 95, 1, false), '+
                '($1, 96, 1, false), '+
                '($1, 97, 1, false), '+
                '($1, 98, 1, false), '+
                '($1, 99, 1, false), '+
                '($1, 100, 1, false), '+
                '($1, 101, 1, false), '+
                '($1, 102, 1, false), '+
                '($1, 103, 1, false), '+
                '($1, 104, 1, false), '+
                '($1, 105, 1, false), '+
                '($1, 106, 1, false), '+
                '($1, 107, 1, false)'


                 
module.exports = {
   all: () => db.any( ALL ),
   getCardsByPlayer: ( game_id, user_id ) => db.any( GETCARDSBYPLAYER, [ game_id, user_id ] ),

   /*Called when a new game is starting to set all game cards into the deck belonging to the default user=1.
     Call drawTopCard after this.*/
  
   newDeck: (game_id) => db.any( NEWDECK, game_id ),
   deletePlayer: ( game_id, user_id ) => db.one( DELETEPLAYER, [ game_id, user_id ] ),
   deleteGame: game_id => db.one( DELETEGAME, game_id),
   cardToPlayer: ( game_id, card_id, user_id ) => db.one( CARDTOPLAYER, [ game_id, card_id, user_id] ),
   getNumCardsInDeck: (game_id) => db.any(GETNUMCARDSINDECK, game_id),
   getNumCardsByPlayer: (game_id, user_id) => db.any(GETNUMCARDSBYPLAYER, [game_id, user_id]),
   
   //Player draws from deck
   drawCardByPlayerId: (user_id, game_id) => db.one(DRAWCARDBYPLAYERID,[ user_id, game_id ] ),
   
   //Player plays a draw 2 card on next player| user_id == the player receiving.
   //Recommend checking number of cards in deck prior to call.
   draw2CardsByPlayerId: (user_id, game_id) => db.many(DRAW2CARDSBYPLAYERID,[ user_id, game_id ] ),
   
   //Player plays a draw 4 card on the next player| user_id == the player receiving.
   //Recommend a check on number of cards in deck before calling
   draw4CardsByPlayerId: (user_id, game_id) => db.many(DRAW4CARDSBYPLAYERID,[ user_id, game_id ] ),
  
   //Call this after playCard ---> Games.setTopCard(result.card_id) --> then games.setPlayerTurn( ... ) to update Games table.
   playCard: (game_id, user_id, card_id) => db.one(PLAYCARD, [ game_id, user_id, card_id ]) ,
   
   //Recommend a reset when number of cards in deck == 4 or some number close to but higher. 
   reset: game_id => db.none(RESET, game_id), 
   
   //Call this after newDeck() ---> Games.setTopCard(result.card_id)
   drawTopCard :(game_id)=> db.one(DRAWTOPCARD, [ game_id ]) 
                
       
}
