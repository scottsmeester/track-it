var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var logActivityController = require('./controllers/logActivity.js');
var activitiesController = require('./controllers/activities.js');
var progressController = require('./controllers/progress.js');
var todaysStuffController = require('./controllers/todaysStuff.js');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

// Api-specific routes:
app.get('/api/activities', activitiesController.getAll);
app.get('/api/progress', progressController.getToday);
app.get('/api/todaysStuff', todaysStuffController.getTodaysStuff);
app.post('/api/activities/:id', activitiesController.logActivity);
// app.post('/api/activities', activitiesController.logActivity);

// Templates route:
app.get('/templates/:templateid', indexController.getTemplate);

app.post('/logActivity/:user_id', logActivityController.logActivity);

var server = app.listen(6403, function() {
	console.log('Express server listening on port ' + server.address().port);
});