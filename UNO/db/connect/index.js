const pgp = require('pg-promise')()
const configDB = require('../configDB')
const prepend_dir = __dirname + '/../../public/images/UnoCard/'
const connection = {
    host: configDB.host,
    port: configDB.port,
    database: configDB.name,
    user: configDB.user,
    password: configDB.pw
}

const db = pgp(process.env.DATABASE_URL || connection)
db.none("UPDATE Cards SET image=CONCAT( $1, image) WHERE image NOT LIKE  $1'%'';'", prepend_dir)
    .then(() => {
        console.log("Updated Cards image column");
    })
    .catch(error => {
        console.log(error);
    });

module.exports = db