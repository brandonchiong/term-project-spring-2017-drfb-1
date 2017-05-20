var socket = io();

var userid = document.currentScript.getAttribute('userid')
var username = document.currentScript.getAttribute('username')
var gameid = document.currentScript.getAttribute('gameid')

var playerCards = [];
var players = [];
var num_starting_cards = 7;

var userData = {
  userid : userid,
  username : username,
  gameid : gameid,
  numberOfCardsInHand : 7,
  ready: false
};

var gameData = {
  gameid : gameid,
  cardTurnClockwise: false,
  currentPlayerTurn: 0,
  start: false,
  topCard: {id:null, card_type:null, color:null, number:null, image:null}
};

console.log("userid: " + userid);
console.log("gameid: " + gameid);

socket.emit('join_game', userData, gameData, username);

socket.on('update_players', function(socketPlayers) {
  players = socketPlayers;
});

socket.on('update_gameData2', function(data) {
  console.log('updating game data for ' + username);
  gameData.currentPlayerTurn = data.currentPlayerTurn;
  gameData.cardTurnClockwise = data.cardTurnClockwise;
})

//GAME LOGIC 
var card_area = document.getElementById('card-area');


document.getElementById("drawFromDeck").addEventListener("click", function(cards){
  if(gameData.start){ 
    console.log( userData.username + " drew a card!");
    socket.emit('reset', gameData);
    socket.emit('draw_card', userData);
  }
});

document.getElementById("UNO").addEventListener("click", function(){
  if(gameData.start){ 
    console.log('Uno');
    console.log("cardturn " + gameData.cardTurnClockwise);
    if(playerCards.length != 1){
      console.log('Uno check failed. Penalty incurred!\n' + playerCards.length + " cards in hand.")
      alert("You have more than one card!\n2 Card penalty!")
      var i
      for(i = 0; i<2; i++ ){
        socket.emit('draw_card', userData)
        userData.numberOfCardsInHand++;
      }
    }
    else{
      socket.emit('uno_called', "You called Uno!!")
      socket.broadcast.emit('uno_called', userData.username + " has one card left!!!")
    }
  }
});

document.getElementById("ready").addEventListener("click", function(){
  console.log("User is ready to play!");
  userData.ready= true;
});

document.getElementById("start").addEventListener("click", function(){
  gameData.start = ( userData.ready )? true:false;
  if(gameData.start){ 
    console.log('Game ready to start')
    var i
    console.log('Drawing initial hand')
    for(i = 0; i<num_starting_cards; i++){
      socket.emit('draw_card', userData)
      userData.numberOfCardsInHand++;
    }
    document.getElementById("ready").style.visibility = "hidden"
    document.getElementById("start").style.visibility = "hidden"
    renderTopCard();
  }
})
document.getElementById("end").addEventListener("click", function(){
  socket.emit('end_game', gameData)
  console.log('Ending game.')
})
socket.on('draw_card', function(gamecards, cardpath) {
  // console.log("TOP CARD: " + gameData.topCard);

  var card = gamecards.card_id;
  var path = cardpath.image;
  playerCards.push(cardpath);
  console.log("CP: Type; " + cardpath.card_type);
  console.log(card);
  console.log("PATH: " + path);
  renderCard();
  // playerCards.forEach(function(index){
  //   console.log("PLAYERCARD LEN" + playerCards.length);
  //   console.log("PLAYERCARD Number: " + index.number);
  //   console.log("PLAYERCARD ID: " + index.id);
  //   console.log("PLAYERCARD Type: " + index.card_type);
  // });

  // getNextPlayerTurn();

})

document.getElementById('cardToPlay').onkeypress = function(e) {
  if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      playCard();
      this.value='';
    }
}
//Value -1 for Player Handindex
function playCard(){
	players.forEach(function(index){
    console.log("PLAYERS IN GAME" + index);
  });

	if (isCurrentPlayerTurn() == false){
		return;
	}
  console.log("inside PLAYCARD");
  if (document.getElementById("cardToPlay").value > playerCards.length){

    alert ("Number is greater than cards held");
    return;
  }

  if (document.getElementById("cardToPlay").value < 1){
    alert ("Please don't break me, choose a number greater or equal to 1");
    return;
  }
  var card = document.getElementById("cardToPlay").value -1;
  console.log("inside PLAYCARD input : " + card);

  if (isValidPlay(playerCards[card])){
    gameData.topCard = playerCards[card];
    var cardPlayed = playerCards[card];
    
    renderTopCard();

    document.getElementById('cardToPlay').value = '';

    console.log("playCard() playerCards[card].card_type" + playerCards[card].card_type);
    removeCardFromPlayerHandAndBoard(card);

      if (cardPlayed.card_type != 'number'){
        if (cardPlayed.card_type == 'skip'){
          getNextPlayerTurn();
          getNextPlayerTurn();
          return;
        }
        else if (cardPlayed.card_type == 'reverse'){
          if (gameData.cardTurnClockwise == true){
            gameData.cardTurnClockwise == false;
          }
          else if (gameData.cardTurnClockwise == false){
            gameData.cardTurnClockwise == true;
          }
        }
        else if (cardPlayed.card_type == 'wild4'){
            getNextPlayerTurn();
		    for(i = 0; i<4; i++){
		      socket.emit('draw_card', userData);
		    }
		    return;
        }
        else if (cardPlayed.card_type == 'wild'){
          
        }
        else if (cardPlayed.card_type == 'draw2'){
            getNextPlayerTurn();
		    for(i = 0; i<2; i++){
		      socket.emit('draw_card', userData);
		    }
		    return;
        }
      }
    if(gameData.numberOfCardsInHand == 0) {
      alert("YOU WIN!")
    }

    getNextPlayerTurn();
  }
}

socket.on('init_topcard', function(tmpcard){
  gameData.topCard.id = tmpcard.id;
  gameData.topCard.card_type = tmpcard.card_type;
  gameData.topCard.color = tmpcard.color;
  gameData.topCard.number = tmpcard.number;
  gameData.topCard.image = tmpcard.image;
  console.log('client set topcard to ' + gameData.topCard.id)
  console.log(gameData.topCard);
})

socket.on('uno_msg', function(msg){
  alert(msg)
})
function renderCard() {
  var node = document.getElementById("card-area");

//  console.log(node);
  var card = new Image(72, 120);

  playerCards.forEach(function(index){
    card.src = index.image;
    card.id = index.id;
    node.appendChild(card);

    console.log("inside loop: card id: " + card.id);
  });
}

function renderTopCard() {
  document.getElementById("top-card").src = gameData.topCard.image;
}

function getNextPlayerTurn(){
  if (gameData.cardTurnClockwise){
    gameData.currentPlayerTurn--;
    if (gameData.currentPlayerTurn < 0){
      gameData.currentPlayerTurn = players.length-1;
    }
  }
  else{
    gameData.currentPlayerTurn++;
    if (gameData.currentPlayerTurn > players.length-1){
      gameData.currentPlayerTurn = 0;
    }
  }
  socket.emit('update_gameData', gameData);
}
// function getNextPlayerTurn(){
//   if (gameData.cardTurnClockwise){
//     gameData.currentPlayerTurn--;
//     if (gameData.currentPlayerTurn < 0){
//       gameData.currentPlayerTurn = 3;
//     }
//   }
//   else{
//     gameData.currentPlayerTurn++;
//     if (gameData.currentPlayerTurn > 3){
//       gameData.currentPlayerTurn = 0;
//     }
//   }
// }

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

function isCurrentPlayerTurn(){
	console.log("players[gameData.currentPlayerTurn]" + players[gameData.currentPlayerTurn]);
	console.log("username" + username);
	  if (players[gameData.currentPlayerTurn] == username){
	    return true;
	  }
	  else{
	  	alert ("It's not your turn");
	  	return false;
	  } 
}

function isValidPlay(playerCard){
  console.log ("inside VALID PLAY: card Type " + playerCard.card_type);
  console.log ("inside VALID PLAY: card Number" + playerCard.number);
  if (gameData.topCard.card_type == 'wild' || gameData.topCard.card_type == 'wild4'){
    console.log ("VALID PLAY: true");
    return true;
  }
  if (playerCard.card_type == 'wild' || playerCard.card_type == 'wild4'){
    console.log ("VALID PLAY: true");
    renderTopCard();
    return true;
  }
  if (playerCard.color == gameData.topCard.color ){
    console.log ("VALID PLAY: " + playerCard.color + " " + gameData.topCard.color );
    console.log ("VALID PLAY: true");
    renderTopCard();
    return true;
  }
  if (playerCard.number == gameData.topCard.number){
    console.log ("VALID PLAY: " + playerCard.number + " " + gameData.topCard.number );
    console.log ("VALID PLAY: true");
    renderTopCard();
    return true;
  }
  else{
    alert ("not valid play");
    return false;
  } 
}


// function Update(){
//   getNextPlayerTurn();

//   //TODO: UNO condition
// }