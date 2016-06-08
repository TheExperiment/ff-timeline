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

    console.log('get ' + timelineId)
    
    setTimeout(function(){
        // callback(error, result);
        // success :
        var item = Tasks.findOne({
            _id: timelineId
        });
        
        if (!item) {
            console.log("cant find item")

        } else
        console.log(item)
        Meteor.ffFunctions.deepLink(item.userObj);
        // callback(null,"result");
        // failure:
        // callback(new Error("error"));
    },500)
  },
  'selectedUsr': function(timelineId){
      var selectedUsr = timelineId;
      return Tasks.findOne({ _id: timelineId });
  }
 });

