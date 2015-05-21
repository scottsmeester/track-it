var Activities = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var activitiesController = {
  getAll: function(req, res){
    Activities.find({}, function(err, results){
      res.send(results);
    });
  },
  saveActivityChanges: function(req, res) {
    var activityId = req.body._id;
    Activities.findByIdAndUpdate(activityId, req.body, function(err, result){
      res.send(result);
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