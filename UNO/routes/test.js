const express = require('express')
const router = express.Router()

const { Cards } = require('../db')
const { Users } = require('../db')

router.get('/', (request, response) => {
    Cards.all()
        .then(cards => {
            response.render('test', { cards })
            console.log(cards.id);
        })
/*    var uname = 'someguy1'
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
