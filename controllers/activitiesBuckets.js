var ActivitiesBuckets = require('../models/activitiesBucketsModel.js');
// var User = require('../models/userModel.js');
var activitiesBucketsController = {
  getAllBuckets: function(req, res){
    ActivitiesBuckets.find({}, function(err, results){
      // console.log('results', results);
      res.send(results);
    });
  },
  moveBucket: function(req, res) {
    var activityId = req.body._id;
    ActivitiesBuckets.findByIdAndUpdate(activityId, req.body, function(err, result){
      res.send(result);
    });
  }
};

module.exports = activitiesBucketsController;