var mongoose = require('mongoose');
var _ = require('underscore');

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

userSchema.methods.getToday = function(cb){
  var today = (new Date()).toDateString();
  var todayObj = _.find(this.day, function(day){
    // console.log(day.date.toDateString(), today);
    return day.date.toDateString() === today;
  });
  if(todayObj){
    cb(null, todayObj);
  }
  else {
    this.day.push({});
    this.save(function(err, result){
      var todayObj = _.find(result.day, function(day){
        console.log(day.date.toDateString(), today);
        return day.date.toDateString() === today;
      });
      cb(null, todayObj);
    });
  }
};

userSchema.methods.pushLogItem = function(logItem, cb){
  var user = this;
  this.getToday(function(err, today){
    today.loggedItems.push(logItem);
    user.save(function(err, results){
      // return results;
      results.getToday(cb);
    });
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;