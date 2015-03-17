var Activities = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var activitiesController = {
  getAll: function(req, res){
    Activities.find({}, function(err, results){
      res.send(results);
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