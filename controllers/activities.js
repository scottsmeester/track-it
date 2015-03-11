var Activities = require('../models/activitiesModel.js');
var activitiesController = {
  getAll: function(req, res){
    Activities.find({}, function(err, results){
      res.send(results);
    });
  }
};

module.exports = activitiesController;