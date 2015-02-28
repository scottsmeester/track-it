var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstname: {type: String, default: 'Guest'},
  lastname: {type: String},
  loggedItems: [{
    timestamp: Date,
    activity: String,
    points: Number,
    legit: {type: Boolean, default: true}
  }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;