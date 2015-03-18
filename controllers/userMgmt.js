var User = require('../models/userModel.js');

var userMgmtController = {
  update: function(req, res){
    User.findOne({_id: req.user._id}, function(err, results){
      var userId = req.user._id;
      User.findByIdAndUpdate(userId, req.body, function(err, result){
        res.send(result);
      });
    });
  },
  edit: function(req, res){
    User.findOne({_id: req.user._id}, function(err, results){
      res.send(results);
    });
  }
};

module.exports = userMgmtController;