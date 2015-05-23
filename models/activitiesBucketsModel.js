// var _ = require('underscore');
var mongoose = require('mongoose');

var bucketSchema = mongoose.Schema({
	bucket: String,
	activities: [{
            activity: String,
            points: Number,
            description: String
        }]
});

// var activities = mongoose.Schema({
// 	activity: String,
// 	description: String,
// 	points: Number
// });

var ActivitiesBuckets = mongoose.model('ActivitiesBuckets', bucketSchema);

module.exports = ActivitiesBuckets;