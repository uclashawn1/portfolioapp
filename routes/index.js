var express = require('express');
var router = express.Router();
var connection = require('../config/connection.js')

router.get('/', function(req, res, next) {
    connection.query("SELECT * FROM projects", function(err, rows, fields){
    	if(err) throw err;
    	res.render('index', {
    		projects: rows
    	});
    });
});

router.get('/details/:id', function(req, res, next) {
    connection.query("SELECT * FROM projects WHERE id = ?", req.params.id, function(err, rows, fields){
    	if(err) throw err;
    	res.render('details', {
    		project: rows[0]
    	});
    });
});

module.exports = router;
