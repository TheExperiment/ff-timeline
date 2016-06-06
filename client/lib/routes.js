
FlowRouter.route( '/', {
  action: function() {
    // Do whatever we need to do when we visit http://app.com/terms.
    console.log( "timelines page!" );
    Meteor.call('tasks.getTimeline', 'PaoaFM2p4f7oRG8Zr');
  },
  name: 'savedTimelines' // Optional route name.
});


FlowRouter.route( '/terms', {
  action: function() {
    // Do whatever we need to do when we visit http://app.com/terms.
    console.log( "terms page!" );
  },
  name: 'savedTimelines' // Optional route name.
});