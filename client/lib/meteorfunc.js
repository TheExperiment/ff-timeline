Meteor.myFunctions = {

    buildTimeline : function()
    {
    	console.log('hello')
    },
    deepLink: function(userObj) {
      changeTagline(userObj.dadName+' and <span class="his-name">' +userObj.sonName + '</span> have <span class="window-years">');
      setIsCountdown();
      yearsLeft = getYearsLeft(userObj.sonAge)
    }

}
