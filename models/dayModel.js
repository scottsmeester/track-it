var mongoose = require('mongoose');

var daySchema = mongoose.Schema({
  date: Date,
  goal: {type: Number, default: 25},
  loggedItems: [{
    timestamp: Date,
    activity: String,
    points: Number,
    legit: {type: Boolean, default: true}
  }]
});

var Day = mongoose.model('Day', daySchema);

module.exports = Day;