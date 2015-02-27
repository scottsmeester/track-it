var Activity = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var Day = require('../models/dayModel.js');

var indexController = {
	index: function(req, res) {
    // get all the activities from DB
    Activity.find({}, function(err, activitiesFromDB){
      if(err) throw err;
      // pass resulting docs to the render function
  		res.render('index',{
        activities: activitiesFromDB
      });
    });
	}
};

module.exports = indexController;