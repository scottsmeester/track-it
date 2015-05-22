var Activities = require('../models/activitiesBucketsModel.js');
var User = require('../models/userModel.js');
var activitiesController = {
  getAllBuckets: function(req, res){
    Activities.find({}, function(err, results){
      console.log('err', err);
      res.send(results);
    });
  },
  moveBucket: function(req, res) {
    var activityId = req.body._id;
    Activities.findByIdAndUpdate(activityId, req.body, function(err, result){
      res.send(result);
    });
  }
};

module.exports = activitiesController;