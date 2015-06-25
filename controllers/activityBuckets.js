var ActivityBucket = require('../models/activityBucketsModel.js');

// var User = require('../models/userModel.js');
var bucketsController = {
  getAllBuckets: function(req, res){
    ActivityBucket.find({}, function(err, results){
      console.log('req', req);
      res.send(results);
    });
  },
  moveBucket: function(req, res) {
    var activityId = req.body._id;
    ActivityBucket.findByIdAndUpdate(activityId, req.body, function(err, result){
      res.send(result);
    });
  }
};

module.exports = bucketsController;