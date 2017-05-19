var socket = io();

var userid = document.currentScript.getAttribute('userid')
var username = document.currentScript.getAttribute('username')
var gameid = document.currentScript.getAttribute('gameid')

var userData = {
  userid : userid,
  username : username,
  gameid : gameid
}

socket.emit('join_game', userData);

//GAME LOGIC 
var card_area = document.getElementById('card-area');

var deck = [];

document.getElementById("drawFromDeck").addEventListener("click", function(cards){
  console.log('Draw from Deck');
  // deck = Cards.all();
  // for (var i = 0; i <= 107; i++) {
  //   console.log(deck[i].id);
  // }
  renderCard(0);
  // renderCard(1);

});

document.getElementById("drawFromDiscard").addEventListener("click", function(){
  console.log('Uno');
})

function renderCard(card_id) {
  var node = document.getElementById("card-area");
  console.log(node);
  var card = new Image(72, 120);
  if (card_id == 0)
    card.src =  '/images/UnoCard/red0.png';
  if (card_id == 1)
    card.src = '/images/UnoCard/red1.png';
  if (card_id == 2)
    card.src = '/images/UnoCard/red1.png';
  if (card_id == 3)
    card.src = '/images/UnoCard/red2.png';
  if (card_id == 4)
    card.src = '/images/UnoCard/red2.png';
  if (card_id == 5)
    card.src = '/images/UnoCard/red3.png';
  if (card_id == 6)
    card.src = '/images/UnoCard/red3.png';
  if (card_id == 7)
    card.src = '/images/UnoCard/red4.png';
  if (card_id == 8)
    card.src = '/images/UnoCard/red4.png';
  if (card_id == 9)
    card.src = '/images/UnoCard/red5.png';
  if (card_id == 10)
    card.src = '/images/UnoCard/red5.png';
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