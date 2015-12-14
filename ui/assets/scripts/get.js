var timeline = Parse.Object.extend("timeline");
var myId = 'JxkXQD8zBw' 

function getData() {
  var query = new Parse.Query(timeline);

  query.get(myId, {
    success: function(results) {
      window.resultingData = results
      console.log(resultingData.attributes)
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}