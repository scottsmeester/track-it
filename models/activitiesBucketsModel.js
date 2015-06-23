
var mongoose = require('mongoose');

var bucketSchema = mongoose.Schema({
	bucket: String,
	activities: [{
            activity: String,
            points: Number,
            description: String
        }]
});

var ActivitiesBuckets = mongoose.model('ActivitiesBuckets', bucketSchema);

console.log('ActivitiesBuckets',ActivitiesBuckets);

module.exports = ActivitiesBuckets;