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
  getUser: function(req, res){
    User.findOne({_id: req.user._id}, function(err, results){
      res.send(results);
    });
  }
  // ,
  // checkActivities: function(req, res, next){
  //   User.findOne({_id: req.user._id}, function(err, user){
  //     if (user.activities.length < 1) {
  //     //   user.seedActivities
  //     //   console.log('user.activities',user.activities);
  //       console.log(res);
  //       res.redirect('/customizeActivities/')
  //           // render the shit
  //       // res.render('customizeActivities',{
  //       //   // activities: activitiesFromDB,
  //       //   firstname: user.firstname,
  //       //   lastname: user.lastname,
  //       //   // user_id: userInfo._id,
  //       //   // goal: todaysGoal,
  //       //   // todaysTotal: todaysTotal
  //       // });
  //     }
  //   return next();
  // });
  // }
};

module.exports = userMgmtController;