var q_card = new Image();
var blue0 = new Image();
var blue1 = new Image();
var blue2 = new Image();
var blue3 = new Image();
var blue4 = new Image();
var blue5 = new Image();
var blue6 = new Image();
var blue7 = new Image();
var blue8 = new Image();
var blue9 = new Image();

var action = 0;

var cards = [];

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// card object which stores location of of card on canvas
var Card = function(x_coordinate, y_coordinate, width, height) {
  this.left = x_coordinate;
  this.top = y_coordinate;
  this.right = x_coordinate + width;
  this.bottom = y_coordinate + height;
};


// draws card on canvas
var renderCard = function (context, x_coordinate, y_coordinate, card, cards) {
  context.drawImage(card, x_coordinate, y_coordinate, 
    card.width*0.15, card.height*0.15);
  var card = new Card(x_coordinate, y_coordinate, card.width*0.15, card.height*0.15 );
  cards.push(card);
}



window.onload = function() {
  // context.drawImage(q_card,0,10,q_card.width*0.2, q_card.height*0.2);
}

document.getElementById("back_card").addEventListener("click", function(){
  if(action == 0) {
    // context.drawImage(blue0,10,10,blue0.width*0.15, blue0.height*0.15);
    renderCard(context, 10, 10, blue0, cards);
    action++;
    alert(cards[0].left);
  } else if(action == 1) {
    renderCard(context, 90, 10, blue1, cards);
    action++;
  } else if(action == 2) {
    renderCard(context, 170, 10, blue2, cards);
    action++;
  } else if(action == 3) {
    renderCard(context, 250, 10, blue3, cards);
    action++;
  } else if(action == 4) {
    renderCard(context, 330, 10, blue4, cards);
    action++;
  } else if(action == 5) {
    renderCard(context, 410, 10, blue5, cards);
    action++;
  } else if(action == 6) {
    renderCard(context, 490, 10, blue6, cards);
    action++;
  } else if(action == 7) {
    renderCard(context, 570, 10, blue7, cards);
    action++;
  } else if(action == 8) {
    renderCard(context, 650, 10, blue8, cards);
    action++;
  } else if(action == 9) {
    renderCard(context, 730, 10, blue9, cards);
    action++;
  } 
}, false);

$('#canvas').click(function (e){
  var clickedX = e.pageX - this.offsetLeft;
  var clickedy = e.pageY - this.offsetTop;

  for (var i = 0; i < cards.length; i++) {
    if (clickedX < cards[i].right && clickedX > cards[i].left && clickedY > cards[i].top && clickedY < cards[i].bottom ) {
      alert('clicked number ' + i);
    }
  }
});


q_card.src = 'images/UnoCard/Q.png';
blue0.src= 'images/UnoCard/blue0.png';
blue1.src= 'images/UnoCard/blue1.png';
blue2.src= 'images/UnoCard/blue2.png';
blue3.src= 'images/UnoCard/blue3.png';
blue4.src= 'images/UnoCard/blue4.png';
blue5.src= 'images/UnoCard/blue5.png';
blue6.src= 'images/UnoCard/blue6.png';
blue7.src= 'images/UnoCard/blue7.png';
blue8.src= 'images/UnoCard/blue8.png';
blue9.src= 'images/UnoCard/blue9.png';