// this contoller puts together the components of the 
// track it page - the activities of the user, as well 
// as the users goal, logged items, etc.
var Activity = require('../models/activitiesModel.js');
var User = require('../models/userModel.js');
var _ = require('underscore');


var indexController = {
	index: function(req, res) {
    
    // User.findOne is implementing mongoose's findOne method
    // to get the user who matched up. a callback is sent userInfo
    User.findOne({firstname: 'Scott'},function(err,userInfo){
      if (err) throw err;
        
        // after userInfo is received, getToday is invoked
        // call back is "today" which will contain today's info
        userInfo.getToday(function(err, today){
          if (err) throw err;
          var todaysGoal = today.goal;
          
          // Activity.find uses mongoose's find() method to get the
          // activities from the DB. The callback function renders
          // all the info on the page
          Activity.find({}, function(err, activitiesFromDB){
            if(err) throw err;
            
            // todaysTotal uses underscore's reduce method to return
            // all the loggedItems total 
            var todaysTotal = 
              _.reduce(today.loggedItems, function(total, item){
                return total + item.points;
              },0);
              
            // render the shit
            res.render('index',{
              // activities: activitiesFromDB,
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
              user_id: userInfo._id,
              goal: todaysGoal,
              todaysTotal: todaysTotal
            });
          });
        });
    });
	},
  getTemplate: function(req, res){
    res.render('templates/' + req.params.templateid);
  }
};

module.exports = indexController;