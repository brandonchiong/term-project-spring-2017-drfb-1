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

var red0 = new Image();
var red1 = new Image();
var red2 = new Image();
var red3 = new Image();
var red4 = new Image();
var red5 = new Image();
var red6 = new Image();
var red7 = new Image();
var red8 = new Image();
var red9 = new Image();

var green0 = new Image();
var green1 = new Image();
var green2 = new Image();
var green3 = new Image();
var green4 = new Image();
var green5 = new Image();
var green6 = new Image();
var green7 = new Image();
var green8 = new Image();
var green9 = new Image();

var yellow0 = new Image();
var yellow1 = new Image();
var yellow2 = new Image();
var yellow3 = new Image();
var yellow4 = new Image();
var yellow5 = new Image();
var yellow6 = new Image();
var yellow7 = new Image();
var yellow8 = new Image();
var yellow9 = new Image();

var deck = [ blue0, blue1, blue2, blue3, blue4, blue5, blue6, blue7, blue8, blue9,
              red0, red1, red2, red3, red4, red5, red6, red7, red8, red9,
              green0, green1, green2, green3, green4, green5, green6, green7, green8, green9,
              yellow0, yellow1, yellow2, yellow3, yellow4, yellow5, yellow6, yellow7, yellow8, yellow9 ];

var cards = [];

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// card object which stores location of of card on canvas
var Card = function(x_coordinate, y_coordinate, width, height) {
  this.left = x_coordinate;
  this.right = x_coordinate + width;
  this.top = y_coordinate;
  this.bottom = y_coordinate + height;
};


// draws card on canvas
var renderCard = function (context, x_coordinate, y_coordinate, image) {
  context.drawImage(image, x_coordinate, y_coordinate, 
    image.width*0.15, image.height*0.15);
  var card = new Card(x_coordinate, y_coordinate, image.width*0.15, image.height*0.15 );
  cards.push(card);
}

window.onload = function() {
}

var i = 0;
var temp_x = 5;
var temp_y = canvas.height - 120;

document.getElementById("back_card").addEventListener("click", function(){
    renderCard(context, temp_x, temp_y, deck[i], cards);

    console.log(cards[i]);
    temp_x += 70;

    if (cards[i].right + 70 > canvas.width) {
      temp_x = 5;
      temp_y -= 115;
    }
    i++;

}, false);

$('#canvas').click(function (e) {
  var clickedX = e.pageX + this.offsetLeft;
  var clickedY = e.pageY - this.offsetTop;

  for (var i = 0; i < cards.length; i++) {
    if (clickedX < cards[i].right && clickedX > cards[i].left && 
      clickedY > cards[i].top && clickedY < cards[i].bottom ) {
      console.log('clicked card ' + i);
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

red0.src= 'images/UnoCard/red0.png';
red1.src= 'images/UnoCard/red1.png';
red2.src= 'images/UnoCard/red2.png';
red3.src= 'images/UnoCard/red3.png';
red4.src= 'images/UnoCard/red4.png';
red5.src= 'images/UnoCard/red5.png';
red6.src= 'images/UnoCard/red6.png';
red7.src= 'images/UnoCard/red7.png';
red8.src= 'images/UnoCard/red8.png';
red9.src= 'images/UnoCard/red9.png';

green0.src= 'images/UnoCard/green0.png';
green1.src= 'images/UnoCard/green1.png';
green2.src= 'images/UnoCard/green2.png';
green3.src= 'images/UnoCard/green3.png';
green4.src= 'images/UnoCard/green4.png';
green5.src= 'images/UnoCard/green5.png';
green6.src= 'images/UnoCard/green6.png';
green7.src= 'images/UnoCard/green7.png';
green8.src= 'images/UnoCard/green8.png';
green9.src= 'images/UnoCard/green9.png';

yellow0.src= 'images/UnoCard/yellow0.png';
yellow1.src= 'images/UnoCard/yellow1.png';
yellow2.src= 'images/UnoCard/yellow2.png';
yellow3.src= 'images/UnoCard/yellow3.png';
yellow4.src= 'images/UnoCard/yellow4.png';
yellow5.src= 'images/UnoCard/yellow5.png';
yellow6.src= 'images/UnoCard/yellow6.png';
yellow7.src= 'images/UnoCard/yellow7.png';
yellow8.src= 'images/UnoCard/yellow8.png';
yellow9.src= 'images/UnoCard/yellow9.png';