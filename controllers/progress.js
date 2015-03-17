var User = require('../models/userModel.js');
var _ = require('underscore');
var progressController = {
  getToday: function(req, res){
    User.findOne({_id: req.user._id}, function(err, results){
      results.getToday(function(err, today){
        // todaysTotal uses underscore's reduce method to return
        // all the loggedItems total 
        var todaysTotal = 
          _.reduce(today.loggedItems, function(total, item){
            return total + item.points;
          },0);
        res.send({goal: today.goal,todaysTotal: todaysTotal});
      });
    });
  }
};

module.exports = progressController;