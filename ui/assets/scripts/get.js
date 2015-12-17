var timeline = Parse.Object.extend("timeline");
var myId = 'JxkXQD8zBw' 

function getTimeline(timelineId) {
  var query = new Parse.Query(timeline);

  query.get(timelineId, {
    success: function(results) {
      window.resultingData = results
      console.log(resultingData.attributes)
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}