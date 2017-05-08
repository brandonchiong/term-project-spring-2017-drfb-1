var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('game', { title: 'Game' });
});

module.exports = router;

//Game Logic Start
var cardTurn = false; //clockwise if true, counter clockwise if false
var currentPlayerTurn = 1;


function getNextPlayerTurn(){
	if (isCardTurnReversed == true){

	}
}

function isCardTurnReversed(){
	return cardTurn;
}

function isCurrentPlayerTurn(){
	if (true){

	}
	else alert ("Its not your turn");
}

function isValidPlay(){
	//
	if (){
		return true;
	}
	else return false;
}

function Update(){

}