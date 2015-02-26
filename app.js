var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');

// Require mongoose
var mongoose = require('mongoose');

// Connect to a database
mongoose.connect('mongodb://localhost/salesTools');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

var server = app.listen(6403, function() {
	console.log('Express server listening on port ' + server.address().port);
});
