var Activity = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var _ = require('underscore');


var indexController = {
	index: function(req, res) {
    User.findOne({firstname: 'Scott'},function(err,userInfo){
      if (err) throw err;
        userInfo.getToday(function(err, today){
          if (err) throw err;
          var todaysGoal = today.goal;
          Activity.find({}, function(err, activitiesFromDB){
            if(err) throw err;
            var todaysTotal = 
              _.reduce(today.loggedItems, function(total, item){
                return total + item.points;
              },0);
            res.render('index',{
              activities: activitiesFromDB,
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
              user_id: userInfo._id,
              goal: todaysGoal,
              todaysTotal: todaysTotal
            });
          });
        });
    });
	}
};

module.exports = indexController;