const pgp = require('pg-promise')()
const configDB = require('../configDB')
const prepend_dir = '/images/UnoCard/'
const connection = {
    host: configDB.host,
    port: configDB.port,
    database: configDB.name,
    user: configDB.user,
    password: configDB.pw
}

const db = pgp(process.env.DATABASE_URL || connection)

module.exports = db