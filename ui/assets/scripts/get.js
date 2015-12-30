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
  $('.content').addClass('isHash')
  $('body').addClass('isCountdown')
  $('.content').addClass('isYouName')
  $('.content').addClass('isSonName')
  $('.content').addClass('isBothNames')
  yearsLeft = Math.max(0,18 - resultingData.attributes.son_age);

  initializeClock();
  
  $('.your-name').empty();

  $('.son-name').html(resultingData.attributes.son_name );
  $('.your-name').html(resultingData.attributes.father_name );
  $('.son-slider .age').html(resultingData.attributes.son_age );
  $('.you-slider .age').html(resultingData.attributes.father_age );

  $('.tagline').html(resultingData.attributes.father_name+' and '+resultingData.attributes.son_name+' have <span class="window-years">' +yearsLeft+' more years together.</span><br><span class="parenthetical">(Until '+resultingData.attributes.son_name+' turns 18)</span>')

  $('.content').addClass("isSonAge");
  $('.content').addClass("isSonAge");
}
