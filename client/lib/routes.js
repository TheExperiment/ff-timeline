
FlowRouter.route( '/', {
  action: function() {
    console.log( "timelines page!" );
    var timelineId = FlowRouter.getQueryParam("tid")

    setTimeout(function(){

        var item = Timeline.findOne({
            _id: timelineId
        });
        
        if (!item) {
            console.log("cant find item")

        } else
        console.log(item)
        Meteor.ffFunctions.deepLink(item.userObj);
    },1000)
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