
var mongoose = require('mongoose');

var bucketSchema = mongoose.Schema({
	buckets:[
		{
			name: String,
			activities:[
				{
		            activity: String,
		            points: Number,
		            description: String
		        }
	        ]
		}
	]
});

var ActivityBucket = mongoose.model('ActivityBuckets', bucketSchema);

module.exports = ActivityBucket;