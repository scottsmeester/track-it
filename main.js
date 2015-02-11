
//////////////////////
/// init variables ///

// var totalToday = 0;

///////////////
/// classes ///

/**
 * a sales/marketing activity
 * @param {number} points      the points associated with this activity
 * @param {string} name        name of the activity
 * @param {string} description 
 */
var targetCount = 0;
var Tracked = function(name, description, points){
  this.name = name;
  this.description = description;
  this.points = points;
  this.index = targetCount;
  targetCount++;
};

/**
 * creating a Day object that is used for today's points
 * @param {date} date today's date
 */
var Day = function(date){
  this.day = date || setDate(day);
  this.log = [];
};

/**
 * a person who uses this app
 * @param {string} name       the name of the user
 * @param {number} goal       the point total of the user
 * @param {object} activities [description]
 */
var User = function(name, goal, activities){
  this.name = name || '';
  this.goal = goal || 25; // units of a goal are points
  this.activities = [];
};

///////////////
/// methods ///

/**
 * displays the activity
 * @return {jQuery} render each activity button
 */
Tracked.prototype.render = function(){
  this.$el = $('#activityTemplate')
  .clone()
  .attr('id', '')
  .addClass((this.name.length > 16)?'w2':'')
  .data('tracked', this);
  // .addClass((this.index % 3 === 0)?'w2':'');
// console.log(this.name.length);
  this.$el.find('.activityName').text(this.name);
  this.$el.find('.activityDesc').text(this.description);
  this.$el.find('.activityPoints').html('<p>' + this.points + '</p>');
  // console.log(this.name);

  return this.$el;
};

/**
 * render user info
 * @return {jQuery} jquery tag to render DOM
 */
User.prototype.render = function(){
  this.$el = $('<div>')
    .addClass('user')
    .append(
      $('<h2>').text(this.name))
    .append(
      $('<h3>').text('Your goal is ' + this.goal + ' points'))
    .append(
      $('<h3 class="userPoints">'));
  return this.$el;
};

/**
 * add the activity to the day's total
 * @return {number} the current points added up
 */
Day.prototype.addPoints = function(points, timeStamp){
  this.log.push({'points':points, 'timeStamp': timeStamp});
  var runningTotal =
    _.pluck(this.log, 'points')
    .reduce(function(total, item){
      return total + item;
  }, 0);

  return runningTotal;
};

////////////
/// data ///

var arrActivities = [
  {
    name: 'Goals Review',
    description: 'Review your vision board. Look at your goals. Remind yourself why you\'re doing this!',
    points: 3
  },
  {
    name: 'Digital Connection',
    description: 'Be it phone, Twitter, Facebook, etc., connecting with somebody puts you and your message top of mind!',
    points: 3
  },
  {
    name: 'Voice',
    description: 'Tried to call somebody, but only get voicemail? Leave a message with your purpose and hope...',
    points: 1
  },
  {
    name: 'Hand Written Correspondence',
    description: 'Use the US Post Office to help get a higher than 90% open rate!',
    points: 4
  },
  {
    name: 'Face to Face',
    description: 'Coffee, lunch, ',
    points: 5
  },
  {
    name: 'Professional Event',
    description: 'Networking, meetups, presentations...',
    points: 7
  },
  {
    name: 'Exercise / Diet Yesterday',
    description: 'Did you get some sort of movement... yesterday? Did you eat well... yesterday?',
    points: 2
  },
  {
    name: 'Blog Post',
    description: 'Develop some helpful content. Need an idea? Answer the last question a prospect asked.',
    points: 6
  },
  {
    name: 'Give Referral',
    description: 'Help somebody else out and give a great referral!',
    points: 3
  },
  {
    name: 'Newsletter Article',
    description: '',
    points: 6
  },
  {
    name: 'E-mail',
    description: '',
    points: 1
  },
  {
    name: 'Thank You Note',
    description: 'Nothing like getting a personal note.',
    points: 1
  },
  {
    name: 'LinkedIn Connection',
    description: 'Mark up a point for a new high-quality connection on LinkedIn.',
    points: 1
  },
];

//////////////
/// jquery ///
$(document).on('ready', function() {
  $('.infoHead').append(audrey.render());

  for (var i = 0; i < objTracked.length; i++){
    $('.activities').append(objTracked[i].render());
  }

  var container = document.querySelector('.activities');
  var pckry = new Packery( container, {
    // options
    itemSelector: '.activity',
    gutter: 20
    // "isHorizontal": true,
    // rowHeight: 160
    // gutter: 'gutter-sizer',
    // columnWidth: '.grid-sizer',
  });

  $('.activity')
    .mouseenter(function(){
      $(this).addClass('mouseOver');
    })
    .mouseleave(function(){
      $(this).removeClass('mouseOver');
    })
    .click(function(){
      var timeStamp = new Date();
      $(this).removeClass('mouseOver');
      $(this).addClass('mouseClick');
      that = this;
      setTimeout(function(){
        $(that).removeClass('mouseClick');
      }, 500);
      var tracked = $(this).data('tracked');
      $('.userPoints').text('You have ' + today.addPoints(tracked.points, timeStamp) + ' points today');
    });
});

///////////////////////
/// created objects ///
var audrey = new User('Audrey', 25);
var todaysDate = new Date();
var today = new Day(todaysDate);

var i;
var objTracked = [];
for (i = 0; i < arrActivities.length; i++){
  objTracked[i] = new Tracked(arrActivities[i].name, arrActivities[i].description, arrActivities[i].points);
}








