$( document ).ready(function() {

  // Indicators
  setInterval(function () {

    // Current
    $.get('/motion_sensor/5', function(data) {

      if (data.return_value == true) {
        $( "#motion-status" ).text("No Motion");
      }
      else {
        $( "#motion-status" ).text("Motion Detected");
      }

    });

  }, 2000);

});
