var mongoose = require('mongoose');

var bucketSchema = mongoose.Schema({
	buckets:[
		{
			name: String,
			activities:[
				{
		            activity: String,
		            description: String,
		            points: Number
		        }
	        ]
		}
	]
});

var ActivityBucket = mongoose.model('ActivityBuckets', bucketSchema);

module.exports = ActivityBucket;