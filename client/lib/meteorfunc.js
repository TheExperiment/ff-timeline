var timeInterval = 0;
Meteor.ffFunctions = {
    buildTimeline : function()
    {
    	console.log('hello')
    },
    deepLink: function(userObj) {
    	console.log('deeplink' + userObj['sonName'])
      Meteor.ffFunctions.changeTagline(userObj['dadName']+' and <span class="his-name">' +userObj['sonName'] + '</span> have <span class="window-years">');
      Meteor.ffFunctions.setIsCountdown();
      yearsLeft = Meteor.ffFunctions.getYearsLeft(userObj['sonAge'])
    },
    changeTagline: function(message) {
    	$('.tagline').css({
    		'-webkit-transition-duration':'1s',
    		'-webkit-filter':'blur(10px) opacity(0%)'
    	})
    	setTimeout(function(){
    		$('.tagline').html(message)
    		$('.tagline').css({
    			'-webkit-transition-duration':'1s',
    			'-webkit-filter':'blur(0px) opacity(100%)'
    		})
    	},1000)
    },
    setIsCountdown: function(message) {
    	countdownTimer = setTimeout(function(){
    		$('body').addClass('isCountdown');
    		Meteor.ffFunctions.initializeClock();
    		sunTick = 1;
    	},1000)
    },
    initializeClock: function() {
    	clock = document.getElementById('clock');
    	minus = document.getElementById('minus');
    	Meteor.ffFunctions.startCountdown(0);
    	setTimeout(function(){
    		minus.getElementsByTagName('h2')[0].classList.add('fade-in')
    		Meteor.ffFunctions.startCountdown(0);
    	},1000)
    	setTimeout(function(){
    		minus.getElementsByTagName('h2')[1].classList.add('fade-in')
    		Meteor.ffFunctions.startCountdown(47);
    	},2000)
    	setTimeout(function(){
    		minus.getElementsByTagName('h2')[2].classList.add('fade-in')
    		Meteor.ffFunctions.startCountdown(117);
    	},5000)
    	setTimeout(function(){
    		minus.getElementsByTagName('h2')[3].classList.add('fade-in')
    		Meteor.ffFunctions.startCountdown(150);
    	},8500)
    	setTimeout(function(){
    		minus.getElementsByTagName('h2')[4].classList.add('fade-in')
    		Meteor.ffFunctions.startCountdown(154);
    	},11500)
    },
    startCountdown: function(minusHours) {
    	var endtime = new Date(Date.now() + ((yearsLeft * 365 * 24 * 60 * 60 * 1000)-((minusHours*52)*yearsLeft)*60*60*1000));
    	var daysSpan = clock.querySelector('.days');
    	var hoursSpan = clock.querySelector('.hours');
    	var minutesSpan = clock.querySelector('.minutes');
    	var secondsSpan = clock.querySelector('.seconds');

    	function updateClock() {
    	  var t = Meteor.ffFunctions.getTimeRemaining(endtime);

    	  daysSpan.innerHTML = Math.max(0,t.days);
    	  hoursSpan.innerHTML = ('0' + Math.max(0,t.hours)).slice(-2);
    	  minutesSpan.innerHTML = ('0' + Math.max(0,t.minutes)).slice(-2);
    	  secondsSpan.innerHTML = ('0' + Math.max(0,t.seconds)).slice(-2);

    	  if (t.total <= 0) {
    	    clearInterval(timeInterval);
    	  }
    	}

    	updateClock();
    	clearInterval(timeInterval)
    	timeInterval = setInterval(updateClock, 1000);
    },
    getYearsLeft: function(sonAge) {
		if(!sonAge){
			sonAge = Number($('.son-slider').find($('.age')).text());
		}
		yearsLeft = Math.max(0,(18-sonAge));
		$('body').css({
			'-webkit-filter':'saturate('+(40+((yearsLeft/18)*60))+'%)'
		})
		return yearsLeft;
    },
    getTimeRemaining: function(endtime) {
		var t = Date.parse(endtime) - Date.now();
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		var days = Math.floor(t / (1000 * 60 * 60 * 24));
		return {
		  'total': t,
		  'days': days,
		  'hours': hours,
		  'minutes': minutes,
		  'seconds': seconds
		};
	}
}
