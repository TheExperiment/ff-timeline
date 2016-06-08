import { Mongo } from 'meteor/mongo';
 
Timeline = new Mongo.Collection('timelines');


Meteor.methods({
  'tasks.insert'(userObj) {
    // check(text, String);
 
    // Make sure the user is logged in before inserting a task
    // if (! this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }
 
    Timeline.insert({userObj, createdAt: new Date()}, function(err,docsInserted){
    console.log(docsInserted);
    FlowRouter.setQueryParams({tid: docsInserted});
    });
  },
  'tasks.getTimeline'(timelineId) {
    // console.log('get ' + timelineId)
    
    setTimeout(function(){

        var item = Timeline.findOne({
            _id: timelineId
        });
        
        if (!item) {
            console.log("cant find item")

        } else
        console.log(item)
        Meteor.ffFunctions.deepLink(item.userObj);
    },500)
  }
 });

