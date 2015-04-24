var User = require('../userModel.js');

User.find({}, function(err, documents){
  if(documents.length === 0){
    // Prefill the empty database with some data

    var smeester = new User({
      firstname: "Scott",
      lastname: "Smeester",
      day: [{
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
      }],
      activities: [
      {
        activity:"Goals Review",
        points: 3,
        description: "Review your vision board. Look at your goals. Remind yourself why you're doing this!"
      },
      {
        activity:"Digital Connection",
        points: 3,
        description: "Be it phone, Twitter, Facebook, etc., connecting with somebody puts you and your message top of mind!"
      },
      {
        activity:"Voice",
        points: 1,
        description: "Tried to call somebody, but only get voicemail? Leave a message with your purpose and hope..."
      },
      {
        activity:"Hand Written Correspondence",
        points: 4,
        description: "Use the US Post Office to help get a higher than 90% open rate!"
      },
      {
        activity:"Face to Face",
        points: 5,
        description: "Coffee, lunch, whatever. If it's face to face, it's good!"
      },
      {
        activity:"Professional Event",
        points: 7,
        description: "Networking, meetups, presentations..."
      },
      {
        activity:"Exercise / Diet Yesterday",
        points: 2,
        description: "Did you get some sort of movement... yesterday? Did you eat well... yesterday?"
      }
    ],
      username: "scottsmeester",
      email: "scotty@smeester.com",
      password: "Ref@ctorU"
    });
    smeester.save();

    var joe = new User({
      firstname: "Joe",
      lastname: "Zengo",
      day: [{
        goal: 25,
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
      }],
      activities: [
      {
        activity:"Goals Review",
        points: 3,
        description: "Review your vision board. Look at your goals. Remind yourself why you're doing this!"
      },
      {
        activity:"Digital Connection",
        points: 3,
        description: "Be it phone, Twitter, Facebook, etc., connecting with somebody puts you and your message top of mind!"
      },
      {
        activity:"Voice",
        points: 1,
        description: "Tried to call somebody, but only get voicemail? Leave a message with your purpose and hope..."
      },
      {
        activity:"Hand Written Correspondence",
        points: 4,
        description: "Use the US Post Office to help get a higher than 90% open rate!"
      },
      {
        activity:"Face to Face",
        points: 5,
        description: "Coffee, lunch, whatever. If it's face to face, it's good!"
      },
      {
        activity:"Professional Event",
        points: 7,
        description: "Networking, meetups, presentations..."
      },
      {
        activity:"Exercise / Diet Yesterday",
        points: 2,
        description: "Did you get some sort of movement... yesterday? Did you eat well... yesterday?"
      }
    ],
      username: "joezengo",
      email: "joezengo@smeester.com",
      password: "Ref@ctorU"
    });
    joe.save();

    var ted = new User({
      firstname: "Ted",
      lastname: "Johnson",
      day: [ {
        goal: 25,
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
      }],
      activities: [
      {
        activity:"Goals Review",
        points: 3,
        description: "Review your vision board. Look at your goals. Remind yourself why you're doing this!"
      },
      {
        activity:"Digital Connection",
        points: 3,
        description: "Be it phone, Twitter, Facebook, etc., connecting with somebody puts you and your message top of mind!"
      },
      {
        activity:"Voice",
        points: 1,
        description: "Tried to call somebody, but only get voicemail? Leave a message with your purpose and hope..."
      },
      {
        activity:"Hand Written Correspondence",
        points: 4,
        description: "Use the US Post Office to help get a higher than 90% open rate!"
      },
      {
        activity:"Face to Face",
        points: 5,
        description: "Coffee, lunch, whatever. If it's face to face, it's good!"
      },
      {
        activity:"Professional Event",
        points: 7,
        description: "Networking, meetups, presentations..."
      },
      {
        activity:"Exercise / Diet Yesterday",
        points: 2,
        description: "Did you get some sort of movement... yesterday? Did you eat well... yesterday?"
      }
    ],
      username: "tedjohnson",
      email: "tedjohnson@smeester.com",
      password: "$2a$10$JzzDrVLLpPIjXN5xNGUWIuls5Z.dG2/vJ8iH9qRrdJz3Zlgi8PetO"
    });
    ted.save();
  }
});
