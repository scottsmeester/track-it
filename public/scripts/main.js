

//////////////
/// jquery ///
$(document).on('ready', function(){
  
  var container = document.querySelector('.activities');
  var pckry = new Packery( container, {
    // options
    itemSelector: '.activity',
    gutter: 20
  });

  var usersGoal = 25; // setting default
  // $('.progress').append(today.renderProgress(usersGoal)) ;

  $(document).on('click', '.activity', logActivity);

  $('.activity')
    .mouseenter(function(){
      $(this).addClass('mouseOver');
    })
    .mouseleave(function(){
      $(this).removeClass('mouseOver');
    });
    // .click(function(){



      // var addToLog = function(e){

      // };


      // var todaysPercent = 0;
      // timeStamp = new Date();
      // tracked = $(this).data('tracked');

      // console.log(tracked);

      // runningTotal = today.updatePoints(tracked.points, tracked.name, timeStamp);

      // $('.goalProgress').remove();
      // $('.progress').append(today.renderProgress(usersGoal));

      // todaysPercent = runningTotal / usersGoal * 100;

      // $('.progress-bar').css('width', todaysPercent + '%').html(parseInt(todaysPercent) + '% complete');

      // $('.list-group').append(today.renderLog(tracked.points, tracked.name,timeStamp));

      // $('.logRemove').click(function(){
      //   // e.preventDefault();
      //   console.log('hello');
      // });

    // });

});

var logActivity = function(){
  $(this).removeClass('mouseOver');
  $(this).addClass('mouseClick');
  that = this;
  setTimeout(function(){
    $(that).removeClass('mouseClick');
    $(that).addClass('mouseOver');
  }, 40);

  var timeStamp = new Date();
  var activity = $(this).find('.activityName').text();
  var points = $(this).find('.activityPoints')
    .text()
    .split('').slice(0,1); // leaving just a number

  var whatToLog = {
    timestamp: timeStamp,
    activity: activity,
    points: parseInt(points)
  };

  $.post('/logActivity', whatToLog, function(returnData){
    console.log('Successfully posted data to DB!', returnData);
  });

  // console.log(whatToLog);
};





