
FlowRouter.route( '/', {
  action: function() {
    console.log( "timelines page!" );
    var timelineId = FlowRouter.getQueryParam("uuid")
    // Meteor.call('tasks.getTimeline', timelineId);
    // Meteor.ffFunctions.deepLink(timelineId);
    setTimeout(function(){
        // callback(error, result);
        // success :
        var item = Tasks.findOne({
            _id: timelineId
        });
        
        if (!item) {
            console.log("cant find item")

        } else
        console.log(item)
        Meteor.ffFunctions.deepLink(item.userObj);
        // callback(null,"result");
        // failure:
        // callback(new Error("error"));
    },200)
  },
  name: 'savedTimelines' // Optional route name.
});


FlowRouter.route( '/terms', {
  action: function() {
    console.log( "terms page!" );
  },
  name: 'termsroute' // Optional route name.
});