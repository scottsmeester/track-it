var User = require('../models/userModel.js');

var logActivityController = {
  logActivity: function(req, res){

    // designate which user
    var userId = req.params.user_id;
    


    // var logItem = new LogItem(newLogItem);

    // console.log(newLogItem);

    var newLogItem = req.body;

    console.log(userId);

    User.findByIdAndUpdate(userId, newLogItem, function(err, result){
      res.send(result);
    });
  }
};

module.exports = logActivityController;