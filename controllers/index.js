var Activity = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var Day = require('../models/dayModel.js');
var Log = require('../models/logModel.js');

var indexController = {
	index: function(req, res) {
    // get the users info
    User.find({}, function(err,userInfo){
      if (err) throw err;
      // get all the activities from DB
      Activity.find({}, function(err, activitiesFromDB){
        if(err) throw err;
        // pass resulting docs to the render function
        // console.log('activitiesFromDB: ', activitiesFromDB, 'userInfo: ', userInfo[0].goal);
        res.render('index',{
          activities: activitiesFromDB,
          goal: userInfo[0].goal
        });
      });
    });
	},
};

module.exports = indexController;