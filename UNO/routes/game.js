const express = require('express')
const router = express.Router()

const { Cards } = require('../db')

router.get('/', (request, response) => {
  Cards.all().then(cards => {
    response.render('game', { cards })
    console.log(cards.id);
  })    
})

module.exports = router