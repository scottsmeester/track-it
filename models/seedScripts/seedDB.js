var User = require('../userModel.js');

User.find({}, function(err, documents){
  if(documents.length === 0){
    // Prefill the empty database with some Beer

    var smeester = new User({
      firstname : "Scott",
      lastname : "Smeester",
      // day : [ {
      //   goal : 25,
      //   loggedItems:[{
      //     activity:"Goals Review",
      //     points: 3,
      //     legit: true
      //   },{
      //     activity:"Voice",
      //     points: 1,
      //     legit: true
      //   },{
      //     activity:"Professional Event",
      //     points: 7,
      //     legit: true
      //   },{
      //     activity:"Thank You Note",
      //     points: 1,
      //     legit: true
      //   }],
      // }]
    });
    smeester.save();

    var joe = new User({
      firstname : "Joe",
      lastname : "Zengo",
      day : [ {
        goal : 25,
        loggedItems:[{
          activity:"Goals Review",
          points: 3,
          legit: true
        },{
          activity:"Voice",
          points: 1,
          legit: true
        },{
          activity:"Professional Event",
          points: 7,
          legit: true
        },{
          activity:"Thank You Note",
          points: 1,
          legit: true
        }],
      }]
    });
    joe.save();

    var ted = new User({
      firstname : "Ted",
      lastname : "Johnson",
      day : [ {
        goal : 25,
        loggedItems:[{
          activity:"Goals Review",
          points: 3,
          legit: true
        },{
          activity:"Voice",
          points: 1,
          legit: true
        },{
          activity:"Professional Event",
          points: 7,
          legit: true
        },{
          activity:"Thank You Note",
          points: 1,
          legit: true
        }],
      }]
    });
    ted.save();
  }
});
