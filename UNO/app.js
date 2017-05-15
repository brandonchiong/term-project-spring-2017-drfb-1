const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('./config/passport.js')(passport);
const flash = require('connect-flash');
const db = require('./db/connect');

const index = require('./routes/index');
const users = require('./routes/users');
const register = require('./routes/register');
const login = require('./routes/login');
const game = require('./routes/game');
const chat = require('./routes/chat');
const gameLobby = require('./routes/gameLobby');
const rules = require('./routes/rules');
const forgotPassword = require('./routes/forgotPassword');
const test = require('./routes/test');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(session({
    secret: 'drfb',
    resave: false,
    saveUninitialized: false
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/game', game);
app.use('/chat', chat);
app.use('/gameLobby', gameLobby);
app.use('/joinGame', gameLobby)
app.use('/rules', rules);
app.use('/forgotPassword', forgotPassword);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;