var Activities = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var activitiesController = {
  getAll: function(req, res){
    Activities.find({}, function(err, results){
      res.send(results);
    });
  },
  logActivity: function(req, res){
    // console.log(req.params);
    User.findOne({firstname: 'Scott'}, function(err, results){
      results.pushLogItem(req.body, function(err, today){
        // console.log('results: ', today);
        res.send(today);
      });
    });
  }
};

module.exports = activitiesController;