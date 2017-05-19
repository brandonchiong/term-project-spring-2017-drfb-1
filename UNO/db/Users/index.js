const db = require('../connect')

const ALL = `SELECT * FROM Users`
const GETUSER = `SELECT * FROM Users WHERE id=$1`
const GETUSER_BY_ALIAS = `SELECT * FROM Users WHERE alias=$1`
const GETPW_BY_ALIAS = 'SELECT pw FROM Users WHERE alias=$1'
const GETEMAIL_BY_ALIAS = 'SELECT email FROM Users WHERE alias=$1'
const CREATEUSER = `INSERT INTO Users ( alias, email, pw ) VALUES ( $1, $2, $3 ) RETURNING *`
const DELETEUSER = `DELETE FROM Users WHERE id = $1`

module.exports = {
   all: () => db.any( ALL ),
   getUser: id => db.oneOrNone( GETUSER, id ),
   getUser_by_alias: alias => db.oneOrNone( GETUSER_BY_ALIAS, alias ),
   getPw_By_Alias: alias => db.oneOrNone( GETPW_BY_ALIAS, alias),
   getEmail_by_Alias: alias => db.oneOrNone( GETEMAIL_BY_ALIAS, alias),
   createUser: ( alias, email, pw ) => db.one( CREATEUSER, [ alias, email, pw ] ),
   deleteUser: id => db.none( DELETEUSER, id ),
}