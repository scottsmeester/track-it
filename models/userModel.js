// the userModel performs CRUD stuff on mongoose
// and creates reusable methods for the 
var mongoose = require('mongoose');
var _ = require('underscore');

/**
 * [userSchema each user has individual days written as needed in the log.
 * eacy day has logged items]
 * @type {[object]}
 */
var userSchema = mongoose.Schema({
  firstname: {type: String, default: 'Guest'},
  lastname: {type: String},
  day: [{
    date: {type: Date, default: Date.now},
    goal: {type: Number, default: 25},
    loggedItems: [{
      timestamp: {type: Date, default: Date.now},
      activity: String,
      points: Number,
      legit: {type: Boolean, default: true}
    }]
  }]
});

/**
 * a function that checks to see if there are any 'day' itmes
 * in the db. if there aren't, it creates one 
 * @param  {Function} cb supplies the todayObj object with all of 
 * today's stuff (goal and logged items)
 */
userSchema.methods.getToday = function(cb){
  var today = (new Date()).toDateString();
  // .find takes in all of this users days in to search
  // it looks for a match of today
  var todayObj = _.find(this.day, function(day){
    return day.date.toDateString() === today;
  });
  // give the callback null for error, today's items
  // if there is already entries in the DB
  if(todayObj){
    cb(null, todayObj);
  }
  else {
    // TODO - not working
    // create a empty object in day's array of objects
    this.day.push({});
    // save the function, pass result 
    this.save(function(err, result){
      var todayObj = _.find(result.day, function(day){
        console.log(day.date.toDateString(), today);
        return day.date.toDateString() === today;
      });
      cb(null, todayObj);
    });
  }
};

/**
 * add activity to loggedItems in a day
 * @param  {object}   logItem consists of activity and points
 * @param  {Function} cb      takes a callback 
 * @return {object}           today's saved info, like logged items
 */
userSchema.methods.pushLogItem = function(logItem, cb){
  var user = this;
  // use the getToday method to find todays activities, callback
  // takes today object with loggedIbemss array of objects
  this.getToday(function(err, today){
    // push a new logItem object to loggedItems array
    today.loggedItems.push(logItem);
    // use mongoose save methos, using callback with results
    user.save(function(err, results){
      // when it's saved, getToday is invoked with the callback cb
      results.getToday(cb);
    });
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;