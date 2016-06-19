import { Mongo } from 'meteor/mongo';

Timeline = new Mongo.Collection('timelines')
// Timeline = new Mongo.Collection('timelines');

Meteor.methods({
  'tasks.insert'(userObj) {
 
    Timeline.insert({userObj, createdAt: new Date()}, function(err,newTimeline){
    console.log(newTimeline);
    FlowRouter.setQueryParams({tid: newTimeline});
    });
  },
  'tasks.getTimeline'(timelineId) {
    setTimeout(function(){

        var item = Timeline.findOne({
            _id: timelineId
        });
        
        if (!item) {
            console.log("cant find item")

        } else
        console.log(item)
        Meteor.ffFunctions.deepLink(item.userObj);
    },1500)
  }
 });

