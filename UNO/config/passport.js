const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = require('../models/users.js');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    users.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
    function(username, password, done) {
      users.findByUsername(username, function (err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.pw != password) {
          return done(null, false, { message: 'Incorrect password.' });
          console.log('Incorrect password');
        }
        return done(null, user);
      });
    }
  ));
}