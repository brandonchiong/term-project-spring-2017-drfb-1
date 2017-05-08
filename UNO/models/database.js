const connection = {
	host: 'localhost',
	database: 'Uno',
	port: 5432,
	user: 'postgres',
	password: ''
};

const pgp = require('pg-promise')();
const db = pgp(connection);

module.exports = db;
