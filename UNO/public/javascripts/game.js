var socket = io();

var userid = document.currentScript.getAttribute('userid')
var username = document.currentScript.getAttribute('username')
var gameid = 1
var playerCards = [];

var userData = {
  userid : userid,
  username : username,
  gameid : gameid,
  numberOfCardsInHand : 100,
  ready: false
};

var gameData = {
  gameid : gameid,
  cardTurnClockwise: false,
  currentPlayerTurn: 0,
  start: false,
  topCard: {id:35, card_type:'number', color:'y', number:4}
};

console.log("userid: " + userid);
console.log("gameid: " + gameid);

socket.emit('join_game', userData);

//GAME LOGIC 
var card_area = document.getElementById('card-area');



document.getElementById("drawFromDeck").addEventListener("click", function(cards){
  if(gameData.start){ 
    console.log( userData.username + " drew a card!");
    socket.emit('draw_card', userData);
  }
});

document.getElementById("UNO").addEventListener("click", function(){
  if(gameData.start){ 
    console.log('Uno');
    console.log("cardturn " + gameData.cardTurnClockwise);
    if(userData.numberOfCardsInHand != 1){
      console.log('Uno check failed. Penalty incurred!')
      var i
      for(i = 0; i<2; i++ ){
        socket.emit('draw_card', userData)
        userData.numberOfCardsInHand++;
      }
    }
  }
});

document.getElementById("ready").addEventListener("click", function(){
  console.log("User is ready to play!");
  userData.ready= true;
});

document.getElementById("start").addEventListener("click", function(){
  gameData.start = ( userData.ready )? true:false;
  console.log('Game ready to start')
})

socket.on('draw_card', function(gamecards, cardpath) {
  var card = gamecards.card_id;
  var path = cardpath.image;
  playerCards.push(cardpath);
  console.log("CP: Type; " + cardpath.card_type);
  console.log(card);
  console.log("PATH: " + path);
  renderCard();
  playerCards.forEach(function(index){
    console.log("PLAYERCARD LEN" + playerCards.length);
    console.log("PLAYERCARD Number: " + index.number);
    console.log("PLAYERCARD ID: " + index.id);
    console.log("PLAYERCARD Type: " + index.card_type);
  });

  if (playerCards.length > 6){
    removeCardFromPlayerHandAndBoard(0);
  }
})

function renderCard() {
  //clearCardArea();
  var node = document.getElementById("card-area");
  //clear card area

//  console.log(node);
  var card = new Image(72, 120);

  playerCards.forEach(function(index){
    card.src = index.image;
    card.id = index.id;
    node.appendChild(card);
    console.log("inside loop: card id: " + card.id);
  });
}

function clearCardArea(){
  var node = document.getElementById("card-area");
  //clear card area
  while (node.firstChild){
    node.removeChild(node.firstChild);
  }
}

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

function removeCardFromPlayerHandAndBoard(index){
  if (index < playerCards.length){
    var itemToRemove = document.getElementById(playerCards[index].id);
    itemToRemove.parentNode.removeChild(itemToRemove);
    console.log("Removed :" + playerCards[index].id);
    playerCards.splice(index,1);
  }
  else
    console.log("index is out of Range:" + index);
}
// function isCurrentPlayerTurn(){
//   if (true){
//     //TODO: turn action
//   }
//   else alert ("Its not your turn");
// }

function isValidPlay(playerCard, topCard){
  console.log ("inside VALID PLAY: ");
  if (playerCard.card_type == 'wild' || playerCard.card_type == 'wild4'){
    return true;
  }
  if (playerCard.color == topCard.color ){
    console.log ("VALID PLAY: " + playerCard.color + " " + topCard.color );
    console.log ("VALID PLAY: true");
    return true;
  }
  if (playerCard.number == topCard.number){
    console.log ("VALID PLAY: " + playerCard.number + " " + topCard.number );

    console.log ("VALID PLAY: true");
    return true;
  }
  else{
    alert ("not valid play");
    return false;
  } 
}


// //TODO: maybe not needed?
// function cardAction(){

// }
// function Update(){
//   getNextPlayerTurn();

//   //TODO: UNO condition
// }