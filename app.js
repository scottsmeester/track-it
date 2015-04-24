var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var activitiesController = require('./controllers/activities.js');
var progressController = require('./controllers/progress.js');
var todaysStuffController = require('./controllers/todaysStuff.js');
var authenticationController = require('./controllers/authentication');
var userMgmtController = require('./controllers/userMgmt');
// var favicon = require('serve-favicon');

// Require mongoose
var mongoose = require('mongoose');

// Connect to a database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/salesTools');

// Seed the database:
require('./models/seedScripts/seedDB.js');

// Express Session allows us to use Cookies to keep track of
// a user across multiple pages. We also need to be able to load
// those cookies using the cookie parser
var session = require('express-session');
var cookieParser = require('cookie-parser');

// Flash allows us to store quick one-time-use messages
// between views that are removed once they are used.
// Useful for error messages.
var flash = require('connect-flash');

// Load in the base passport library so we can inject its hooks
// into express middleware.
var passport = require('passport');

// Load in our passport configuration that decides how passport
// actually runs and authenticates
var passportConfig = require('./config/passport');


var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Add in the cookieParser and flash middleware so we can use them later
app.use(cookieParser());
app.use(flash());

// Initialize the express session. Needs to be given a secret property. 
// Also requires the resave option (will not force a resave of session 
// if not modified) as well as saveUninitialized(will not automatically 
// create empty data)
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Hook in passport to the middleware chain
app.use(passport.initialize());

// Hook in the passport session management into the middleware chain.
app.use(passport.session());

// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

// salesforce login routes
app.get('/auth/salesforce',
  passport.authenticate('forcedotcom'),
  function(req, res){
});
app.get('/auth/salesforce/callback',
  passport.authenticate('forcedotcom', { failureRedirect: '/oops' }),
  function(req, res) {
   res.redirect('/');
});

// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js 
// module.exports), We can prevent unauthorized access to any route 
// handler defined after this call to .use()
app.use(passportConfig.ensureAuthenticated);

app.get('/', indexController.index);

// Api-specific routes:
app.get('/api/activities', activitiesController.getUsersActivities);
app.get('/api/progress', progressController.getToday);
app.get('/api/todaysStuff', todaysStuffController.getTodaysStuff);
app.post('/api/activities/:id', activitiesController.logActivity);
app.put('/api/updateActivity', todaysStuffController.updateActivity);
app.get('/api/getUser/', userMgmtController.edit);
app.post('/api/updateUser/', userMgmtController.update);

// Templates route:
app.get('/templates/:templateid', indexController.getTemplate);

// app.post('/logActivity/:user_id', logActivityController.logActivity);

var port = process.env.PORT || 6403;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});