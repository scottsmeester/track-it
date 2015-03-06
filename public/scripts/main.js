

//////////////
/// jquery ///
$(document).on('ready', function(){
  
  var container = document.querySelector('.activities');
  var pckry = new Packery( container, {
    // options
    itemSelector: '.activity',
    gutter: 20
  });

  // var usersGoal = 25; // setting default
  // $('.progress').append(today.renderProgress(usersGoal)) ;

  $(document).on('click', '.activity', logActivity);

  $('.activity')
    .mouseenter(function(){
      $(this).addClass('mouseOver');
    })
    .mouseleave(function(){
      $(this).removeClass('mouseOver');
    });
    

      // $('.list-group').append(today.renderLog(tracked.points, tracked.name,timeStamp));

      // $('.logRemove').click(function(){
      //   // e.preventDefault();
      //   console.log('hello');
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

  // data from client
  var activity = $(this).find('.activityName').text();
  var points = $(this).find('.activityPoints')
    .text()
    .split('').slice(0,1); // leaving just a number

  // get user ID
  var targetId = $(this).parent().attr('data-id');

  var whatToLog = {
    activity: activity,
    points: parseInt(points)
  };

  var todaysGoal = $('span#goal').text();

  $.post('/logActivity/' + targetId, whatToLog ,function(returnData){
    // console.log('Successfully posted data to DB!', returnData.todaysTotal);
    $('#todaysPoints').text(returnData.todaysTotal);
    var todaysPercent = (returnData.todaysTotal / todaysGoal) * 100
    $('.progress-bar').css('width', Math.floor(todaysPercent) + '%').html(Math.floor(todaysPercent) + '% complete!');
  });
};





