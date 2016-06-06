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
      // sonName: text.sonName,
      //username: Meteor.tasks.insert(this.userId).username,
    });
  },
  'tasks.getTimeline'(timelineId) {
 	console.log(timelineId)
 	var results = Tasks.find(this.timelineId);
  // results = Tasks.findOne({ _id:("W5wyEyQxjGcRZjAai") })
 	console.log(results)
    // FlowRouter.getQueryParam("queryParamName");
  },
 });