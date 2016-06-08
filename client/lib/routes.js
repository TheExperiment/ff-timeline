
FlowRouter.route( '/', {
  action: function() {
    console.log( "timelines page!" );
    // var timelineId = window.location.hash.split('?')[1];
    var timelineId = FlowRouter.getQueryParam("uuid")
    // placeHashes();
    // WIN.on('resize',placeHashes)
    // setWindowWidth
    Meteor.call('tasks.getTimeline', timelineId);
  },
  name: 'savedTimelines' // Optional route name.
});


FlowRouter.route( '/terms', {
  action: function() {
    console.log( "terms page!" );
  },
  name: 'termsroute' // Optional route name.
});