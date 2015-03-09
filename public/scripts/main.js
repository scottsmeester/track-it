angular.module('TrackIt', [

  ])
  .controller('MainCtrl', function($scope){
    $scope.hello = 'world';
  });

$(document).on('ready', function(){
  
  // creating the layout of activities
  var container = document.querySelector('.activities');
  var pckry = new Packery( container, {
    itemSelector: '.activity',
    gutter: 20
  });

  // activity clicks
  $(document).on('click', '.activity', logActivity);

  $('.activity')
    .mouseenter(function(){
      $(this).addClass('mouseOver');
    })
    .mouseleave(function(){
      $(this).removeClass('mouseOver');
    });
});

// method for logging activities
var logActivity = function(){

  // handling what visually happens after a click
  $(this).removeClass('mouseOver');
  $(this).addClass('mouseClick');
  that = this;
  setTimeout(function(){
    $(that).removeClass('mouseClick');
    $(that).addClass('mouseOver');
  }, 40);

  // setting the variables of info to post to DB
  var activity = $(this).find('.activityName').text();
  var points = $(this).find('.activityPoints')
    .text()
    .split('').slice(0,1);
    // console.log(points);
  var targetId = $(this).parent().attr('data-id');
  // build the object to pass
  var whatToLog = {
    activity: activity,
    points: parseInt(points)
  };

  var todaysGoal = $('#goal').text();

  // ajax call to post the activity to the mongo DB
  /**
   * ajax call to post the activity to the mongo db
   * @param  {[string|} the URL with the ID of the User
   * @param  {[object|} whatToLog passed to be entered into DB
   * @param  {[callback func|} this callback function will create update todays total and todays percent
   */
  $.post('/logActivity/' + targetId, whatToLog ,function(returnData){

    $('#todaysPoints').text(returnData.todaysTotal);
    var todaysPercent = (returnData.todaysTotal / todaysGoal) * 100;
    $('.progress-bar').css('width', Math.floor(todaysPercent) + '%').html(Math.floor(todaysPercent) + '% complete!');
  }); 
};