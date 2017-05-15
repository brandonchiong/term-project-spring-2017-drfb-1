var express = require('express');
var router = express.Router();

const { Users } = require('../db');

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res) {
    req.checkBody('name', 'Field must be filled.').notEmpty();
    req.checkBody('pw', 'Field must be filled.').notEmpty();
    req.checkBody('email', 'Field must be filled.').notEmpty();
    var errors = req.validationErrors();

    var username = req.body.name;
    var password = req.body.pw;
    var email = req.body.email;

    if (errors) {
        res.render('register', { title: 'Register' });
        return;
    } else {


        Users.create(username, email, password)
            .then(users => {
                console.log('User id: ' + users.id + ' inserted.')
                res.redirect('gameLobby');
            })
            .catch(error => {
                console.log(error)
                res.redirect('register');
            });
    }
});

module.exports = router;