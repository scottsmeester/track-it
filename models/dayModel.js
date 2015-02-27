var mongoose = require('mongoose');

var daySchema = mongoose.Schema({
  day: Date,
  runningTotal: Number,
  runningPercent: Number
});

var Day = mongoose.model('Day', daySchema);

module.exports = Day;