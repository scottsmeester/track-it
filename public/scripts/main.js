$(document).on('ready', function(){
  
  var container = document.querySelector('.activities');
  var pckry = new Packery( container, {
    itemSelector: '.activity',
    gutter: 20
  });

  $(document).on('click', '.activity', logActivity);

  $('.activity')
    .mouseenter(function(){
      $(this).addClass('mouseOver');
    })
    .mouseleave(function(){
      $(this).removeClass('mouseOver');
    });
});

var logActivity = function(){
  $(this).removeClass('mouseOver');
  $(this).addClass('mouseClick');
  that = this;
  setTimeout(function(){
    $(that).removeClass('mouseClick');
    $(that).addClass('mouseOver');
  }, 40);

  var activity = $(this).find('.activityName').text();
  var points = $(this).find('.activityPoints')
    .text()
    .split('').slice(0,1); // leaving just a number

  var targetId = $(this).parent().attr('data-id');

  var whatToLog = {
    activity: activity,
    points: parseInt(points)
  };

  var todaysGoal = $('span#goal').text();

  $.post('/logActivity/' + targetId, whatToLog ,function(returnData){
    $('#todaysPoints').text(returnData.todaysTotal);
    var todaysPercent = (returnData.todaysTotal / todaysGoal) * 100
    $('.progress-bar').css('width', Math.floor(todaysPercent) + '%').html(Math.floor(todaysPercent) + '% complete!');
  });
};