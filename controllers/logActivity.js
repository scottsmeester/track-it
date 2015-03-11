var User = require('../models/userModel.js');
var _ = require('underscore');

var logActivityController = {
  logActivity: function(req, res){
    // get the userID from the URL
    var userId = req.params.user_id;
    // set newLogItem to what info was sent
    var newLogItem = req.body;
    // getting all the user info with the userId, passing
    // a callback with the info
    User.findById(userId, function(err,userInfo){
      if (err) throw err;
      // infoking pushLogItem method in the user model, passing
      // the newLogItem object and callback func with todaysItems,
      // which is an array of objects of all of todays items for the user
      userInfo.pushLogItem(newLogItem, function(err, todaysItems){
        if (err) throw err;
        // add up todays total to send
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