var socket = io();

var userid = document.currentScript.getAttribute('userid')
var username = document.currentScript.getAttribute('username')
var gameid = 1

var userData = {
  userid : userid,
  username : username,
  gameid : gameid,
  numberOfCardsInHand : 100
}

var gameData = {
  gameid : gameid,
  cardTurnClockwise: false,
  currentPlayerTurn: 0
}

console.log("userid: " + userid);
console.log("gameid: " + gameid);

socket.emit('join_game', userData);

//GAME LOGIC 
var card_area = document.getElementById('card-area');

document.getElementById("drawFromDeck").addEventListener("click", function(cards){
  console.log( userData.username + " drew a card!");
  socket.emit('draw_card', userData);
});

document.getElementById("UNO").addEventListener("click", function(){
  console.log('Uno');
  console.log("cardturn" + gameData.cardTurnClockwise);
})

socket.on('draw_card', function(gamecards, cardpath) {
  var card = gamecards.card_id;
  var path = cardpath.image;
  console.log("CARD ID: " + card);
  console.log("PATH: " + path);
  renderCard(card, path);
})

function renderCard(card_id, cardpath) {
  var node = document.getElementById("card-area");
  console.log(node);
  var card = new Image(72, 120);
  card.src = cardpath;
  node.appendChild(card);
}

//Game Logic Start
//const socket = io();

// var cardTurnClockwise = false; //clockwise if true, counter clockwise if false
// var currentPlayerTurn = 0;
// var cardPlayed;
// var topCard;

// var playerInfo {

// // }

// $(function () {
// //   $('#start').hide();
// //   $('#ready').hide();
// //   $('#drawFromDeck').hide();
// //   $('#drawFromDiscardPile').hide();
// //   $('#UNO').hide();

// //   //Game Canvas buttons
// //   $('#start').click(function() {
// //     if($('#start').prop('disabled')) {
// //       return false;
// //     }else{
// //     socket.emit('start', playerInfo);
// //     }
// //   })

// //   $('#drawFromDeck').click(function() {
// //     $('#drawFromDeck').hide();
// //     //socket.emit('draw-cards', playerInfo);
// //   })

//  $('#drawFromDiscard').click(function() {
//    alert ("hi");
//    //$('#drawFromDiscardPile').hide();
//    //socket.emit('draw-cards', playerInfo);
//  })



// //   $('#UNO').click(function() {
// //     if($('UNO').prop('disabled')) {
// //   }else{
// //   socket.emit('UNO', myInfo, gameState);
// //   }
// //   return false;
// //   })

// // })


// document.getElementById("drawFromDeck").addEventListener("click", function(){
//    alert ("hi");
// });



function getNextPlayerTurn(){
  if (gameData.cardTurnClockwise){
    gameData.currentPlayerTurn--;
    if (gameData.currentPlayerTurn < 0){
      gameData.currentPlayerTurn = 3;
    }
  }
  else{
    gameData.currentPlayerTurn++;
    if (gameData.currentPlayerTurn > 3){
      gameData.currentPlayerTurn = 0;
    }
  }
}



// function isCurrentPlayerTurn(){
//   if (true){
//     //TODO: turn action
//   }
//   else alert ("Its not your turn");
// }

// function isValidPlay(){
//   //cardPlayed == top card
//   if (true){
//     return true;
//   }
//   else return false;
// }


// //TODO: maybe not needed?
// function cardAction(){

// }
// function Update(){
//   getNextPlayerTurn();

//   //TODO: UNO condition
// }