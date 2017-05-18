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

console.log("userid: " + userid);
console.log("gameid: " + gameid);

socket.emit('join_game', userData);

//GAME LOGIC 
var card_area = document.getElementById('card-area');

document.getElementById("drawFromDeck").addEventListener("click", function(cards){
  console.log( userData.username + " drew a card!");
  socket.emit('draw_card', userData);
});

document.getElementById("drawFromDiscard").addEventListener("click", function(){
  console.log('Uno');
})

socket.on('draw_card', function(gamecards, cardpath) {
  var card = gamecards;
  var path = cardpath.image;
  console.log(card);
  console.log("PATH: " + path);
  renderCard(card.card_id, path);
})

function renderCard(card_id, cardpath) {
  var node = document.getElementById("card-area");
  console.log(node);
  var card = new Image(72, 120);
  card.src = cardpath;
  // if (card_id == 0)
  //   card.src =  '/images/UnoCard/red0.png';
  // if (card_id == 1)
  //   card.src = '/images/UnoCard/red1.png';
  // if (card_id == 2)
  //   card.src = '/images/UnoCard/red1.png';
  // if (card_id == 3)
  //   card.src = '/images/UnoCard/red2.png';
  // if (card_id == 4)
  //   card.src = '/images/UnoCard/red2.png';
  // if (card_id == 5)
  //   card.src = '/images/UnoCard/red3.png';
  // if (card_id == 6)
  //   card.src = '/images/UnoCard/red3.png';
  // if (card_id == 7)
  //   card.src = '/images/UnoCard/red4.png';
  // if (card_id == 8)
  //   card.src = '/images/UnoCard/red4.png';
  // if (card_id == 9)
  //   card.src = '/images/UnoCard/red5.png';
  // if (card_id == 10)
  //   card.src = '/images/UnoCard/red5.png';
  // if (card_id == 11)
  //   card.src =  '/images/UnoCard/red6.png';
  // if (card_id == 12)
  //   card.src = '/images/UnoCard/red6.png';
  // if (card_id == 13)
  //   card.src = '/images/UnoCard/red7.png';
  // if (card_id == 14)
  //   card.src = '/images/UnoCard/red7.png';
  // if (card_id == 15)
  //   card.src = '/images/UnoCard/red8.png';
  // if (card_id == 16)
  //   card.src = '/images/UnoCard/red8.png';
  // if (card_id == 17)
  //   card.src = '/images/UnoCard/red9.png';
  // if (card_id == 18)
  //   card.src = '/images/UnoCard/red9.png';
  // if (card_id == 19)
  //   card.src = '/images/UnoCard/redStop.png';
  // if (card_id == 20)
  //   card.src = '/images/UnoCard/redStop.png';
  // if (card_id == 21)
  //   card.src = '/images/UnoCard/redReverse.png';
  node.appendChild(card);
  // console.log(node);
  // document.getElementById("card-area").appendChild(node);

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



// function getNextPlayerTurn(){
//   if (isCardTurnReversed == true){
//     currentPlayerTurn--;
//     if (currentPlayerTurn < 0){
//       currentPlayerTurn = 4;
//     }
//   }
//   else{
//     currentPlayerTurn++;
//     if (currentPlayerTurn >= 4){
//       currentPlayerTurn = 0;
//     }
//   }
// }

// function isCardTurnReversed(){
//   return cardTurn;
// }

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