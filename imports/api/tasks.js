import { Mongo } from 'meteor/mongo';

Timeline = new Mongo.Collection('timelines')
// Timeline = new Mongo.Collection('timelines');

Meteor.methods({
  'tasks.insert'(userObj) {
 
    Timeline.insert({userObj, createdAt: new Date()}, function(err,docsInserted){
    console.log(docsInserted);
    FlowRouter.setQueryParams({tid: docsInserted});
    });
  },
  'tasks.getTimeline'(timelineId) {
    Meteor.setTimeout(function(){

        var item = Timeline.findOne({
            _id: timelineId
        });
        
        if (!item) {
            console.log("cant find item")

        } else
        console.log(item)
        Meteor.ffFunctions.deepLink(item.userObj);
     },2200)
  }
 });

