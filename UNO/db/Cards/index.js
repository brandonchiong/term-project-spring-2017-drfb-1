const db = require( '../connect' )

const ALL = `SELECT * FROM Cards`
const FIND = `SELECT * FROM Cards WHERE id=$1`

module.exports = {
   all: () => db.any( ALL ),
   find: id => db.oneOrNone( FIND, id ),
}
