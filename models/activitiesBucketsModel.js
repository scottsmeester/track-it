// var _ = require('underscore');
var mongoose = require('mongoose');

var bucketSchema = new mongoose.Schema({
	bucket: String,
	activities: [
        {
            activity: String,
            description: String,
            points: Number
        }
    ]
});

// var activities = mongoose.Schema({
// 	activity: String,
// 	description: String,
// 	points: Number
// });

var ActivitiesBuckets = mongoose.model('ActivitiesBuckets', bucketSchema);

module.exports = ActivitiesBuckets;