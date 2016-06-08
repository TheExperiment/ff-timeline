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

    // selectedUsr(timelineId)
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
        Meteor.myFunctions.deepLink(item.userObj);
        // callback(null,"result");
        // failure:
        // callback(new Error("error"));
    },2000)


    // var test = Tasks.findOne({ _id: 'W5wyEyQxjGcRZjAai' });
    // var task = Tasks.find( {sonName: '77777' }).fetch();
    // var post = Tasks.findOne({ _id: 'PaoaFM2p4f7oRG8Zr' });
    // alert(post);

    // var test = Tasks.find({ name: "77777" }).fetch();
    // console.log(test.text);  
  // Meteor.myFunctions.deepLink(results);
    // FlowRouter.getQueryParam("queryParamName");
  },
  'selectedUsr': function(timelineId){
      var selectedUsr = timelineId;
      return Tasks.findOne({ _id: timelineId });
  }
 });

