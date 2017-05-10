var express = require('express');
var router = express.Router();

const { GameUsers } = require('../db');
const { GameCards } = require('../db');
const { Cards } = require('../db');

router.get('/', function(req, res, next) {
  res.render('game', { title: 'Game' });
});

module.exports = router;

//Game Logic Start
var cardTurn = false; //clockwise if true, counter clockwise if false
var currentPlayerTurn = 0;
var cardPlayed;
var topCard;



function getNextPlayerTurn(){
	if (isCardTurnReversed == true){
		currentPlayerTurn--;
		if (currentPlayerTurn < 0){
			currentPlayerTurn = 4;
		}
	}
	else{
		currentPlayerTurn++;
		if (currentPlayerTurn >= 4){
			currentPlayerTurn = 0;
		}
	}
}

function isCardTurnReversed(){
	return cardTurn;
}

function isCurrentPlayerTurn(){
	if (true){
		//TODO: turn action
	}
	else alert ("Its not your turn");
}

function isValidPlay(){
	//cardPlayed == top card
	if (true){
		return true;
	}
	else return false;
}

function Update(){

}