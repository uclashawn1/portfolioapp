var mysql = require('mysql');

if (process.env.JAWSDB_URL) {
	// DB is on Heroku/JAWSDB
	var connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
	// or DB on localhost
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'ucLAshawn',
		database: 'portfolio'
	});
};

connection.connect();

module.exports = connection