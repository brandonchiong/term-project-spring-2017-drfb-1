const express = require('express')
const router = express.Router()

const { Cards } = require('../db')
const { Users } = require('../db')
const { Games } = require('../db')
const { GameUsers } = require('../db')

router.get('/', (request, response) => {
    
    Games.num_players(1)
       .then(results => {
           console.log(results + " results found!")
           response.redirect('gameLobby')
       })
       .catch( error => {
           response.render('gameLobby')
       })
      
/*    Cards.all()
        .then(cards => {
            response.render('test', { cards })
            console.log(cards.id);
        })
    var uname = 'someguy1'
    var uemail = 'asdgh@lol'
    var upw = "1234asdfffg"
    Users.create(uname, uemail, upw)
    .then(users => {
        console.log('Created id: ' + users.id);
     })
    .catch( () => {
        console.log('Error user not created. \nMake sure user is not already in db.');
    })*/
})

module.exports = router
