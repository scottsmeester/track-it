// var _ = require('underscore');
var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
  name: String,
  description: String,
  points: Number
});

var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;