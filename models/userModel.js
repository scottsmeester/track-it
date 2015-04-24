// the userModel performs CRUD stuff on mongoose
// and creates reusable methods for the 
var mongoose = require('mongoose');
var _ = require('underscore');
var bcrypt = require('bcrypt');

/**
 * [userSchema each user has individual days written as needed in the log.
 * eacy day has logged items]
 * @type {[object]}
 */
var userSchema = mongoose.Schema({
  oauthID: String, // this is from an api like salesforce
  firstname: {
    type: String,
    default: 'Guest'
  },
  lastname: {
    type: String
  },
  day: [{
    date: {
      type: Date,
      default: Date.now
    },
    goal: {
      type: Number,
      default: 25
    },
    loggedItems: [{
      timestamp: {
        type: Date,
        default: Date.now
      },
      activity: String,
      points: Number,
      legit: {
        type: Boolean,
        default: true
      }
    }]
  }],
  activities: [{
    activity: String,
    points: Number,
    description: String
  }],
  username: {
    type: String,
    // required: true,
    unique: true
  },
  email: {
    type: String,
    // required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true
  }
});


/**
 * This allows us to hook into the pre-save DB flow. Our
 * callback will be called whenever a new user is about to
 * be saved to the database so that we can encrypt the password.
 */
userSchema.pre('save', function(next){

  // First, check to see if the password has been modified. If not, just move on.
  if(!this.isModified('password')) return next();

  // Store access to "this", which represents the current user document
  var user = this;

  // Generate an encryption "salt." This is a special way of increasing the
  // encryption power by wrapping the given string in a secret string. Something
  // like "secretpasswordsecret" and then encrypting that result.
  bcrypt.genSalt(10, function(err, salt){

    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);

    // If we are successful, use the salt to run the encryption on the given password
    bcrypt.hash(user.password, salt, function(err, hash){

      // If there was an error, allow execution to move to the next middleware
      if(err) return next(err);

      // If the encryption succeeded, then replace the un-encrypted password
      // in the given document with the newly encrypted one.
      user.password = hash;

      // Allow execution to move to the next middleware
      return next();
    });
  });
});

/**
 * Method on the user schema that allows us to hook into the
 * bcrypt system to compare an encrypted password to a given
 * password. This process doesn't involve unencrypting the stored
 * password, but rather encrypts the given one in the same way and
 * compares those values
 */
userSchema.methods.comparePassword = function(candidatePassword, next){
  // Use bcrypt to compare the unencrypted value to the encrypted one in the DB
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);

    // If there is no error, move to the next middleware and inform
    // it of the match status (true or false)
    return next(null, isMatch);
  });
};


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
    // console.log('day: ', day);
    return day.date.toDateString() === today
      // && day.loggedItems.legit === true
      ;
  });
  // give the callback null for error, today's items
  // if there is already entries in the DB
  if(todayObj){
    cb(null, todayObj);
  }
  else {
    // create a empty object in day's array of objects
    this.day.push({});
    // save the function, pass result 
    this.save(function(err, result){
      var todayObj = _.find(result.day, function(day){
        // console.log(day.date.toDateString(), today);
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
    delete logItem._id;
    today.loggedItems.push(logItem);
    // use mongoose save methos, using callback with results
    user.save(function(err, results){
      // when it's saved, getToday is invoked with the callback cb
      results.getToday(cb);
    });
  });
};

/**
 * when a user doesn't have any activities, this gives him default ones
 * @param  {array}   activities is a an array of all the activities
 * @param  {Function} cb         supplies all of the activities
 * @return {object}              [description]
 */
// userSchema.methods.fillUsersActivities = function(activities, cb){
//   var user = this;
//   console.log('activities:',activities);
//   user.activities.push(activities);
//   user.save(function(err, results){
//     console.log(results);
//       // when it's saved, getToday is invoked with the callback cb
//       // results.getToday(cb);
//     });
// };

var User = mongoose.model('User', userSchema);

module.exports = User;