const db = require('../connect')
const ALL = `SELECT * FROM Cards`
const FIND = `SELECT * FROM Cards WHERE id=$1`
const GETCARDIMG = 'SELECT image FROM Cards WHERE id=$1'
const GETCARDCOLOR = 'SELECT color FROM Cards WHERE id=$1'
const GETCARDTYPE = 'SELECT card_type FROM Cards WHERE id=$1'
const GETCARDNUM = 'SELECT number FROM Cards WHERE id=$1'
module.exports = {
    all: () => db.any(ALL),
    find: id => db.oneOrNone(FIND, id),
    getCardImg: id => db.oneOrNone(GETCARDIMG, id),
    getCardColor: id => db.one(GETCARDCOLOR, id),
    getCardType: id => db.one(GETCARDTYPE, id),
    getCardNum: id => db.one(GETCARDNUM, id),
}