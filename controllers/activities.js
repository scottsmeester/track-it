var Activities = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var activitiesController = {
  getAll: function(req, res){
    Activities.find({}, function(err, results){
      res.send(results);
    });
  },
  // getActivity: function(req, res) {
  //   var activityId = req;
  //   console.log('activityId',activityId);
  //   // Activities.findOne({_id: req.activity._id}, function(err, activity){
  //   //   res.send(activity);
  //   // });
  // },
  saveActivityChanges: function(req, res) {
    var activityId = req.body._id;
    Activities.findByIdAndUpdate(activityId, req.body, function(err, result){
      res.send(result);
    });
    // console.log('activityId',activityId);
  },
  // chooseMine: function(req, res){
  //   console.log('hello');
  //   Activities.find({}, function(err, results){
  //     // res.send(console.log('allActivities', allActivities));
  //     for(var i = 0; i < results.length; i++){
  //       User.findByIdAndUpdate({_id: req.user._id}, )
  //     }
  //   });
  //   // console.log(allActivities);
  //   // User.findOne({_id: req.user._id}, function(err, user){
  //   //   if (err) throw err;
  //   //   // if the user has no activities, we need to assign him
  //   //   // the default activities
  //   //   if(user.activities.length < 1){
  //   //     console.log('user.activities',user.activities);
  //   //     // res.send(user.activities);
  //   //   }
  //   //   // else{
  //   //   //   // get all the default activities and enter them into
  //   //   //   // the users DB, then send them
  //   //   //   Activities.find({}, function(err, results){
  //   //   //     // 
  //   //   //     res.send(results);
  //   //   //     // console.log('results:', results);
  //   //   //   });
  //   //   // }
  //   // });
  // },
  logActivity: function(req, res){
    User.findOne({_id: req.user._id}, function(err, results){
      results.pushLogItem(req.body, function(err, today){
        res.send(today);
      });
    });
  }
};

module.exports = activitiesController;