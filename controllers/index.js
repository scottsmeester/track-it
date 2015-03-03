var Activity = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
// var Day = require('../models/dayModel.js');
// var Log = require('../models/logModel.js');

//set default user (temporary)
var thisUserID = '54f2281a86ed860cd3d0eee1';

// console.log(thisUserID);

var indexController = {
	index: function(req, res) {
    // get the users info
    User.findById(thisUserID, function(err,userInfo){
      if (err) throw err;
      // get the users goal
      userInfo.getToday(function(err, today){
        var todaysGoal = today.goal;
        // console.log(today);
        // userInfo.getTodaysPoints();
        Activity.find({}, function(err, activitiesFromDB){
          if(err) throw err;
          res.render('index',{
            activities: activitiesFromDB,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            user_id: userInfo._id,
            goal: todaysGoal,
            // points: todaysPoints
          });
        });
      });
    });
	}
};

module.exports = indexController;