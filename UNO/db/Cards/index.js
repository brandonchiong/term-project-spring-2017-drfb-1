const db = require('../connect')

const ALL = `SELECT * FROM Cards`
const FIND = `SELECT * FROM Cards WHERE id=$1`
const IMAGE_BY_ID = 'SELECT image FROM Cards WHERE id=$1'
const path = __dirname + '/../public/images/UnoCard/'
module.exports = {
    all: () => db.any(ALL),
    find: id => db.oneOrNone(FIND, id),
    image_by_id: id => path + db.oneOrNone(IMAGE_BY_ID, id)
}