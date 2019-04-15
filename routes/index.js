var express = require('express');
var router = express.Router();
var mysql = require('mysql');


if (process.env.JAWSDB_URL) {
	// DB is on Heroku/JAWSDB
	connection = mysql.createConnection(process.env.JAWSDB_URL)
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

router.get('/', function(req, res, next) {
    connection.query("SELECT * FROM projects", function(err, rows, fields){
    	if(err) throw err;
    	res.render('index', {
    		"projects": rows
    	});
    });
});

router.get('/details/:id', function(req, res, next) {
    connection.query("SELECT * FROM projects WHERE id = ?", req.params.id, function(err, rows, fields){
    	if(err) throw err;
    	res.render('details', {
    		"project": rows[0]
    	});
    });
});

module.exports = router;
