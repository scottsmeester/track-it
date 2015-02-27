

//////////////
/// jquery ///
$(document).on('ready', function(){
  
  var container = document.querySelector('.activities');
  var pckry = new Packery( container, {
    // options
    itemSelector: '.activity',
    gutter: 20
  });

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
        $(that).addClass('mouseOver');
      }, 40);

      // var todaysPercent = 0;
      // timeStamp = new Date();
      // tracked = $(this).data('tracked');

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

    });

});