


//////////////////////
/// init variables ///
var todaysPoints = 0;

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
 * @param {runningTotal} [varname] [description]
 */
var Day = function(date, runningTotal){
  this.day = date || setDate(day);
  this.runningTotal = runningTotal || 0;
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
  this.$el.find('.activityName').text(this.name);
  this.$el.find('.activityDesc').text(this.description);
  this.$el.find('.activityPoints').html('<p>' + this.points + ' <span>pts.<span></p>');
  return this.$el;
};
/**
 * prints to screen the current results
 * @return {jQuery} jquery tag to render DOM
 */
Day.prototype.renderProgress = function(runningTotal, goal){
  var txt1 = runningTotal + ' points today - your goal: ' + goal;

  // console.log('txt1', txt1)
;
  this.$el = $('<div>')
    .addClass('goalProgress')
    .append(txt1);
  return this.$el;
};
/**
 * updates points total
 * @param  {number} points the number of points to add
 * @return {number}        the points the user has on the day
 */
Day.prototype.updatePoints = function(points, activity, timeStamp) {
  this.runningTotal = this.runningTotal + points;
  this.log.push({'points':points,'activity':activity, 'timeStamp':timeStamp});
  return this.runningTotal;
};
/**
 * adds clicked activities to a log
 * @param  {string} activity  [what the person said they did]
 * @param  {number} points [the points for the activity]
 * @param  {string} timeStamp [the time of the click]
 * @return {array}           [array of info for logging]
 */
Day.prototype.renderLog = function(points, activity, timeStamp) {
  this.$el = $('#logItems')
    .clone()
    .attr('id', '');

  this.$el.find('.logActivity').text(activity);
  this.$el.find('.logTime').text(moment(timeStamp).format('h:mm a'));
  this.$el.find('.logPoints').text(points + ' points');
  return this.$el;
};

Day.prototype.removeLogItem = function(itemIndex){
  this.log.splice(itemIndex, 1);
  // console.log(this.log);
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

  var usersGoal = theUser.goal;

  for (var i = 0; i < objTracked.length; i++){
    $('.activities').append(objTracked[i].render());
  }

  var container = document.querySelector('.activities');
  var pckry = new Packery( container, {
    // options
    itemSelector: '.activity',
    gutter: 20
  });

  $('.progress').append(today.renderProgress(todaysPoints, usersGoal)) ;

  $('.activity')
    .mouseenter(function(){
      $(this).addClass('mouseOver');
    })
    .mouseleave(function(){
      $(this).removeClass('mouseOver');
    })
    .click(function(){
      $(this).removeClass('mouseOver');
      $(this).addClass('mouseClick');
      that = this;
      setTimeout(function(){
        $(that).removeClass('mouseClick');
      }, 100);

      var todaysPercent = 0;
      var timeStamp = new Date();
      // timeStamp = moment(timeStamp, 'h:mm a')
      var tracked = $(this).data('tracked');

      todaysPoints = today.updatePoints(tracked.points, tracked.name, timeStamp);

      $('.goalProgress').remove();
      $('.progress').append(today.renderProgress(todaysPoints, usersGoal));

      todaysPercent = todaysPoints / usersGoal * 100;

      $('.progress-bar').css('width', todaysPercent + '%').html(parseInt(todaysPercent) + '% complete');

      $('.list-group').append(today.renderLog(tracked.points, tracked.name,timeStamp));

      // $('.logRemove').click(function(){
      //   // e.preventDefault();
      //   console.log('hello');
      // });

    });
})
  .on('click', '.logRemove', function(){
    var usersGoal = theUser.goal;

    var parent = $(this).parent();
    var thisIndex = parent.index();

    // var day = $(this).data('Day');


    todaysPoints = todaysPoints - today.log[thisIndex].points;

    today.removeLogItem(thisIndex);
    parent.remove();

    // $('.progress').children('.goalProgress').remove();
    $('.progress').children('.goalProgress').remove();
    $('.progress').append(today.renderProgress(todaysPoints, usersGoal));

    todaysPercent = todaysPoints / usersGoal * 100;

    $('.progress-bar').css('width', todaysPercent + '%').html(parseInt(todaysPercent) + '% complete');

    // console.log('todaysPoints: ',newPoints, 'usersGoal: ',usersGoal, 'today; ',today.log, 'index: ', thisIndex);


});

///////////////////////
/// created objects ///
var theUser = new User('Scott', 25);
var todaysDate = new Date();
var today = new Day(todaysDate);

var i;
var objTracked = [];
for (i = 0; i < arrActivities.length; i++){
  objTracked[i] = new Tracked(arrActivities[i].name, arrActivities[i].description, arrActivities[i].points);
}


