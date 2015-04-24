var Activities = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var activitiesController = {
  getAll: function(req, res){
    Activities.find({}, function(err, results){
      res.send(results);
    });
  },
  getUsersActivities: function(req, res){
    User.findOne({_id: req.user._id}, function(err, user){
      if (err) throw err;
      // if the user has no activities, we need to assign him
      // the default activities
      if(user.activities.length > 0){
        // console.log(results.activities);
        res.send(user.activities);
      }
      else{
        // get all the default activities and enter them into
        // the users DB, then send them
        Activities.find({}, function(err, results){
          // 
          res.send(results);
          // console.log('results:', results);
        });
      }
    });
  },
  logActivity: function(req, res){
    User.findOne({_id: req.user._id}, function(err, results){
      results.pushLogItem(req.body, function(err, today){
        res.send(today);
      });
    });
  }
};

module.exports = activitiesController;