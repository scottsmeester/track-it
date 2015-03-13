// var _ = require('underscore');
var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
  activity: String,
  description: String,
  points: Number
});

var Activities = mongoose.model('Activities', activitySchema);

module.exports = Activities;