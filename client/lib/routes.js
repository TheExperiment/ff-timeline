
FlowRouter.route( '/', {
  action: function() {
    console.log( "timelines page!" );
    var timelineId = FlowRouter.getQueryParam("tid")

    console.log(timelineId)
    // Meteor.call('tasks.getTimeline', timelineId);
    // Meteor.call('tasks.getTimeline', 1, function (error, result) {});
    setTimeout(function(){

        var item = Timeline.findOne({
            _id: timelineId
        });

        if (!item) {
            console.log("cant find item")

        } else
        console.log(item)
        Meteor.ffFunctions.deepLink(item.userObj);
    },100)
  },
  name: 'savedTimelines' // Optional route name.
});


FlowRouter.route( '/dbchange', {
  action: function() {
  	Meteor.call('tasks.clearDB');
    console.log( "created" );
  },
  name: 'dbchange' // Optional route name.
});
