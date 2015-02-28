var LogItem = require('../models/logModel.js');
var User = require('../models/userModel.js');
var Day = require('../models/dayModel.js');

var logActivityController = {
  logActivity: function(req, res){

    var newLogItem = req.body;

    var logItem = new LogItem(newLogItem);
    

    console.log(logItem);

    // logItem.save(function(err, savedLogItem){
    //   console.log(savedLogItem);
    // });
  }
};

module.exports = logActivityController;