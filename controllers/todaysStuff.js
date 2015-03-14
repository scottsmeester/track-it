var User = require('../models/userModel.js');
var _ = require('underscore');

var todaysStuffController = {
  getTodaysStuff: function(req, res){
    User.findOne({firstname: 'Scott'}, function(err, results){
      results.getToday(function(err,today){
        // var todaysDate = (new Date()).toDateString();
        // .find takes in all of this users days in to search
        res.send(today);
      });
    });
  },
  updateActivity: function(req, res){
    User.findOne({firstname: 'Scott'}, function(err, results){
      results.getToday(function(err,today){
        // find with ID
        var itemToChange = _.find(today.loggedItems, function(item){
          return item._id == req.body.id;
        });
        itemToChange.legit = false;
        // console.log(today);
        // console.log(itemToChange);
        results.save(function(err, result){
          res.send(result);
        });
      });
    });
  }
};

module.exports = todaysStuffController;