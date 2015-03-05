var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var logActivityController = require('./controllers/logActivity.js');

// Require mongoose
var mongoose = require('mongoose');

// Connect to a database
mongoose.connect('mongodb://localhost/salesTools');

// Seed the database:
require('./models/seedScripts/seedDB.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

app.post('/logActivity/:user_id', logActivityController.logActivity);

var server = app.listen(6403, function() {
	console.log('Express server listening on port ' + server.address().port);
});