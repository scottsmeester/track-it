var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  goal: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;