
var mongoose = require('mongoose');

var bucketSchema = mongoose.Schema({
	bucket: String,
	activities: [{
            activity: String,
            points: Number,
            description: String
        }]
});

var ActivitiesBucket = mongoose.model('ActivitiesBuckets', bucketSchema);

module.exports = ActivitiesBucket;