var socket = io();

var userid = document.currentScript.getAttribute('userid')
var username = document.currentScript.getAttribute('username')
var gameid = document.currentScript.getAttribute('gameid')

var playerCards = [];

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
  topCard: {id:35, card_type:'number', color:'y', number:4}
  //topCard: null
};


console.log("userid: " + userid);
console.log("gameid: " + gameid);

socket.emit('join_game', userData, gameData);

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
      alert("You have more than one card!\n2 Card penalty!")
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
  if(gameData.start){ 
    console.log('Game ready to start')
    var i
    console.log('Drawing initial hand')
    for(i = 0; i<7; i++){
      socket.emit('draw_card', userData)
      userData.numberOfCardsInHand++;
    }
    document.getElementById("ready").style.visibility = "hidden"
    document.getElementById("start").style.visibility = "hidden"
  }
})

socket.on('draw_card', function(gamecards, cardpath) {
  console.log("TOP CARD: " + gameData.topCard);
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

  //getNextPlayerTurn();

})
//Value -1 for Player Handindex
function playCard(){
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
    console.log("playCard() playerCards[card].card_type" + playerCards[card].card_type);
    removeCardFromPlayerHandAndBoard(card);

      if (playerCards[card].card_type != 'number'){
        if (playerCards[card].card_type == 'skip'){
          // getNextPlayerTurn();
          // getNextPlayerTurn();
          return;
        }
        if (playerCards[card].card_type == 'reverse'){
          if (gameData.cardTurnClockwise == true){
            gameData.cardTurnClockwise == false;
          }
          else if (gameData.cardTurnClockwise == false){
            gameData.cardTurnClockwise == true;
          }
        }
        if (playerCards[card].card_type == 'wild4'){
          
        }
        if (playerCards[card].card_type == 'wild'){
          
        }
      }
    //getNextPlayerTurn();
  }
}

socket.on('init_topcard', function(tmpcard){
  gameData.topCard.id = tmpcard
  console.log('client set topcard to ' + gameData.topCard.id)
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

function isValidPlay(playerCard){
  console.log ("inside VALID PLAY: ");
  console.log ("inside VALID PLAY: card Type " + playerCard.card_type);
  console.log ("inside VALID PLAY: card Number" + playerCard.number);
  if (gameData.topCard.card_type == 'wild' || gameData.topCard.card_type == 'wild4'){
    console.log ("VALID PLAY: true");
    return true;
  }
  if (playerCard.card_type == 'wild' || playerCard.card_type == 'wild4'){
    console.log ("VALID PLAY: true");
    return true;
  }
  if (playerCard.color == gameData.topCard.color ){
    console.log ("VALID PLAY: " + playerCard.color + " " + gameData.topCard.color );
    console.log ("VALID PLAY: true");
    return true;
  }
  if (playerCard.number == gameData.topCard.number){
    console.log ("VALID PLAY: " + playerCard.number + " " + gameData.topCard.number );
    console.log ("VALID PLAY: true");
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