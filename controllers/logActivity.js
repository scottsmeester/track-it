var User = require('../models/userModel.js');
var _ = require('underscore');

var logActivityController = {
  logActivity: function(req, res){
    var userId = req.params.user_id;
    var newLogItem = req.body;
    User.findById(userId, function(err,userInfo){
      if (err) throw err;
      userInfo.pushLogItem(newLogItem, function(err, todaysItems){
        if (err) throw err;
        var todaysTotal = 
          _.reduce(todaysItems.loggedItems, function(total, item){
            return total + item.points;
          },0);
          res.send({todaysTotal: todaysTotal});
      });
    });
  }
};

module.exports = logActivityController;