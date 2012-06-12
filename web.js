var express = require('express');
var stache = require('stache');

var app = express.createServer(express.logger());
app.set('view engine', 'mustache');
app.register('.mustache', stache);
app.use(express.static(__dirname + '/statics'));
app.get('/', function(req, res){
	res.render('main', {
		locals: {
		}
	})
});


// ===========================================
//  Verification process
// ===========================================
app.get('/verify', isVerificationRequest, function(req, res){
	if (){
		res.send("ok");
	} else {
		res.send("failed");
	}
});

function isVerificationRequest(req, res, next) {
	var acknowledgeToken = "token";
	console.log("isVerificationRequest");
	if (typeof req.query[acknowledgeToken] != 'undefined'){
		var token = req.query[acknowledgeToken].trim();
		// lookup token in db
	}
}

// ===========================================
//  App initialization
// ===========================================
var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log('Listening on port: ' + port);
});

var initDatabase = function(){
	var pg = require('pg');
	var dbUrl = process.env.DATABASE_URL || 'tcp://espdallo@localhost:5432/liggeran';
	pg.connect(dbUrl, function(err, client) {
		if (err){
			console.log(err);
		}
		var query = client.query('SELECT * FROM reporters');
		query.on('row', function(row) {
			console.log(JSON.stringify(row));
		});
	});
};
initDatabase();