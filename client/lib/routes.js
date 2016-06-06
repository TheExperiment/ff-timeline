
FlowRouter.route( '/', {
  action: function() {
    console.log( "timelines page!" );
    Meteor.call('tasks.getTimeline', 'PaoaFM2p4f7oRG8Zr');
  },
  name: 'savedTimelines' // Optional route name.
});


FlowRouter.route( '/terms', {
  action: function() {
    console.log( "terms page!" );
  },
  name: 'termsroute' // Optional route name.
});