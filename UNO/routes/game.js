var express = require('express');
var router = express.Router();

const { Cards } = require('../db')

router.get('/', (request, response) => {
    Cards.all()
        .then(cards => {
            response.render('game', { title: 'game', cards })
            console.log(cards.id);
        })
      });

module.exports = router;
