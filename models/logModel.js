var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
  user: String,
  timestamp: Date,
  activity: String,
  points: Number,
  legit: {type: Boolean, default: true}
});

var LogItem = mongoose.model('LogItem', logSchema);

module.exports = LogItem;