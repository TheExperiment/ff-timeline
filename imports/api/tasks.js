import { Mongo } from 'meteor/mongo';
 
Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(userObj) {
    // check(text, String);
 
    // Make sure the user is logged in before inserting a task
    // if (! this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }
 
    Tasks.insert({
      userObj,
      createdAt: new Date(),
    });
  },
  'tasks.getTimeline'(timelineId) {
 	// console.log(timelineId)
 	//var results = Tasks.find();
  var results = Tasks.findOne({ _id:(timelineId) })
 	console.log(results)
  Meteor.myFunctions.deepLink(results);
    // FlowRouter.getQueryParam("queryParamName");
  },
 });