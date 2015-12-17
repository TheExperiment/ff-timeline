var timeline = Parse.Object.extend("timeline");
var myId = 'JxkXQD8zBw' 

function getTimeline(timelineId) {
  var query = new Parse.Query(timeline);

  query.get(timelineId, {
    success: function(results) {
      window.resultingData = results
      // console.log(resultingData.attributes)
      setTimeline(resultingData);
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function setTimeline(resultingData) {
  console.log(resultingData.attributes)
  $('.content').addClass('isYouName')
  $('.content').addClass('isSonName')
  $('.content').addClass('isBothNames')
  
  $('.your-name').empty();

  $('.son-name').html(resultingData.attributes.son_name );
  $('.your-name').html(resultingData.attributes.father_name );
  $('.son-slider .age').html(resultingData.attributes.son_age );
  $('.you-slider .age').html(resultingData.attributes.father_age );

  $('.tagline').html('Your Window of Time<br>Together is <span class="window-years">' + (18 - resultingData.attributes.son_age )+' years.</span>')

  $('.content').addClass("isSonAge");

  $('.content').addClass("isSonAge");
  $('.son-slider').css({
    right: WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width())
  })

  $('.window-slider').find($('.bar')).addClass('blink');
}
