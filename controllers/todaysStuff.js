var User = require('../models/userModel.js');
var _ = require('underscore');

var todaysStuffController = {
  getTodaysStuff: function(req, res){
    User.findOne({firstname: 'Scott'}, function(err, results){
      results.getToday(function(err,today){
        var todaysDate = (new Date()).toDateString();
        // .find takes in all of this users days in to search
        res.send(today);
      });
    });
  }
};

module.exports = todaysStuffController;