const db = require('./database');

exports.findById = function(id, cb) {
	db.one('SELECT * FROM users WHERE id = $1', [id])
		.then(user => {
			cb(null, user);
		})
		.catch(error => {
			console.log(error)
		});
};

exports.findByUsername = function(username, cb) {
	db.one('SELECT * FROM users WHERE alias = $1', [username])
		.then(user => {
			cb(null, user);
		})
		.catch(error => {
			console.log(error)
		});
};