var User = require('../models/userModel.js');

var userMgmtController = {
  update: function(req, res){
    User.findOne({_id: req.user._id}, function(err, results){
      // console.log('_id:', req.user._id);
      // console.log(req.body);
      res.send(req.body);
    });
  },
  edit: function(req, res){
    User.findOne({_id: req.user._id}, function(err, results){
      res.send(results);
    });
  }
};

module.exports = userMgmtController;