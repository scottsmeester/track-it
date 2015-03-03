var mongoose = require('mongoose');
var _ = require('underscore');

var userSchema = mongoose.Schema({
  firstname: {type: String, default: 'Guest'},
  lastname: {type: String},
  day: [{
    date: {type: Date, default: new Date()},
    goal: {type: Number, default: 25},
    loggedItems: [{
      timestamp: {type: Date, default: new Date()},
      activity: String,
      points: Number,
      legit: {type: Boolean, default: true}
    }]
  }]
});

userSchema.methods.getToday = function(cb){
  var today = (new Date()).toDateString();
  var todayObj = _.find(this.day, function(day){
    return day.date.toDateString() === today;
  });
  if(todayObj){
    cb(null, todayObj);
  }
  else {
    // create date obj, push  
    this.day.push({});
    this.save(function(err, result){
      var todayObj = _.find(this.day, function(day){
        return day.date.toDateString() === today;
      });
      cb(null, todayObj);
    });
  }
};

userSchema.methods.getDaysPoints = function(){
  // var today = this.getToday();
  // console.log(today);
};

var User = mongoose.model('User', userSchema);

module.exports = User;