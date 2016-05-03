var slider;
var userObj = {};
var resultingData;
var WIN = $(window);
var DOC = $(document);
var countdownTimer;
var slider;
var paused;
var startY;
var sunTick = .2;
var yearsLeft;
var clock;
var timeInterval;
$(function() {
	var sunTop = 0;

	var particleInterval = setInterval(function(){
		if(!paused){
			$('.particles').append('<div class="particle"></div>')
			$('.particle').eq($('.particle').length-100).remove();
			$('.particle').eq($('.particle').length-1).css({
				'-webkit-transform': 'translate('+(Math.random()*(WIN.width()/4)-(WIN.width()/4)/2)+'px,'+(Math.random()*(WIN.height()/4)-(WIN.height()/4)/2)+'px)'
			})
			if(sunTop < 210){
				sunTop += sunTick;
				$('.particles').css({
					top: sunTop
				})
			}
		}else{
			$('.particle').css({
				'-webkit-transform': 'scale(1.6)'
			})
		}
	},20)
	$('.signup').on('click',function(){
		window.location.href = 'http://futurefather.co'
	})
	function startDragHour (e) {
		e.preventDefault();
		slider = $(this)
		if(e.type == 'touchmove'){
			startY = e.originalEvent.touches[0].pageY;
		}else{
			startY = e.pageY
		}
		startHours = Number(slider.text().substr(5));
		WIN.on('mousemove',onMoveHour)
		WIN.on('touchmove',onMoveHour)
		WIN.on('mouseup',onReleaseHour)
		WIN.on('touchend',onReleaseHour)
	}
	$('.hour-picker').on('mousedown',startDragHour)
	$('body').on('scroll',function(){
		$('.particles').css({
			'-webkit-transform': 'perspective(1000) translate3d(0,'+($('.content').offset().top/-5)+'px,'+($('.content').offset().top)+'px)'
		})
	})
	WIN.on('keydown',function(){
		paused = true;
		setTimeout(function(){
			paused = false;
		},1000)
	})
	if(window.location.hash) {
	  var timelineId = window.location.hash.split('#')[1];
	  placeHashes();
	  WIN.on('resize',placeHashes)
	  setWindowWidth
		getTimeline(timelineId);
	}
	else{
		placeHashes()
		WIN.on('resize',placeHashes)
		$('.slider').on('mousedown',startDrag)
		$('.slider').on('touchstart',startDrag)
		var youTimeout;
		var sonTimeout;
		$('.your-name span').on('keydown',function(){
			$('.content').addClass('isTyped')
			resetField($(this))
		})
		$('.your-name').on('keyup',function(){
			clearTimeout(youTimeout);
			youTimeout = setTimeout(function(){
				$('.content').addClass('isYouName')
			},500)
		})
		$('.son-name span').on('keypress',function(e){
			if(e.keyCode == 13){
				continueClick();
			}
			resetField($(this))
			clearTimeout(sonTimeout);
			sonTimeout = setTimeout(function(){
				$('.content').addClass('isSonName')
			},500)
		})
		$('.your-name span').on('keypress',function(e){
			if(e.keyCode == 13){
				e.preventDefault();
				$('.son-name span').focus();
			}
		})
		$('.continue').on('click',continueClick)
		$('.your-name span').focus();
		$('.name span').on('click',function(e){
			resetField($(this))
			$('.content').addClass('isTyped')
		})
		$('.son-name span').on('focus',function(){
			var name = $(this)
			setTimeout(function(){
				resetField(name)
			},600)
		})
	}
	function resetField(el){
		if(el.text() == 'What is your name?'){
			el.html('')
			el.parent().removeClass('not-default')
		}else if(el.text() == 'What do you call your son?'){
			el.html('')
			el.parent().removeClass('not-default')
		}else{
			el.parent().addClass('not-default')
		}

	}
	function continueClick(){
		if(!$('.content').hasClass('isYouName')){
			$('.content').addClass('isYouName')
		}else if(!$('.content').hasClass('isBothNames')){
			$('.content').addClass('isBothNames')
			userObj.sonName = $('.son-name span').text();
			userObj.dadName = $('.your-name span').text();
			changeTagline('How long have you been on Earth, ' + userObj.dadName + '?')
		}else{
			//TREVOR THIS IS THE FINAL CONTINUE. SUBMIT HERE
		}
	}
	function startDrag (e) {
		e.preventDefault();
		slider = $(this)
		WIN.on('mousemove',onMove)
		WIN.on('touchmove',onMove)
		WIN.on('mouseup',onRelease)
		WIN.on('touchend',onRelease)
	}
	function onMove (e) {
		var x;
		if(e.type == 'touchmove'){
			x = e.originalEvent.touches[0].pageX;
		}else{
			x = e.pageX
		}
		if(slider.hasClass('you-slider')){
			$('.content').addClass("isMovingYouAge");
			var width = x - slider.offset().left;
		}else{
			$('.content').addClass("isMovingSonAge");
			$('.content').addClass('isWindow')
			var width = (WIN.width() - x - WIN.width()/10) - (WIN.width()-$('.you-slider').width() + $('.son-slider .age').width()  - (WIN.width() - $('.timeline').width()));
			userObj.index = x;

			setWindowWidth()
		}
		slider.find($('.age')).html(Math.max(0,Math.floor(80*(width/$('.timeline').width()))));
		slider.css({
			width: Math.max(5,Math.min($('.timeline').width(),width))
		})
	}
	function onRelease (e) {
		WIN.off('mousemove')
		WIN.off('touchmove')
		WIN.off('mouseup')
		WIN.off('touchend')
		if(slider.hasClass('you-slider')){
			changeTagline('How long has <span class="window-years his-name">'+userObj.sonName+'</span> been on Earth with you?')
			$('.content').addClass("isSonAge");
			$('.son-slider').css({
				right: (WIN.width() - $('.you-slider').width() - (WIN.width() - $('.timeline').width()) - $('.son-slider .age').width()/2) + $('.son-slider .age').width() + 8
			})
		}else{
			yearsLeft = getYearsLeft();
			changeTagline(userObj.dadName+' and <span class="his-name">' +userObj.sonName + '</span> have <span class="window-years">');
			$('.window-slider').find($('.bar')).addClass('blink');
			userObj.dadAge = $('.you-slider .age').text();
			userObj.sonAge = $('.son-slider .age').text();
			// console.log(userObj)
			// saveTimeline();
			setWindowWidth()
			clearTimeout(countdownTimer)
			$('.his-name').html(userObj.sonName);
			countdownTimer = setTimeout(function(){
				$('body').addClass('isCountdown');
				initializeClock();
				sunTick = 1;
			},1000)
		}
	}
	function getYearsLeft () {
		yearsLeft = Math.max(0,(18-Number($('.son-slider').find($('.age')).text())));
		$('body').css({
			'-webkit-filter':'saturate('+(40+((yearsLeft/18)*60))+'%)'
		})
		return yearsLeft;
	}
	function onMoveHour (e) {
		var y;
		var moved;
		if(e.type == 'touchmove'){
			y = e.originalEvent.touches[0].pageY;
		}else{
			y = e.pageY
		}
		moved = Math.floor((startY-y)/5);
		slider.html("Minus " + Math.max(0,startHours + moved))
		clearTimeout(countdownTimer)
		startCountdown(currentHours())
	}
	function onReleaseHour (e) {
		WIN.off('mousemove')
		WIN.off('touchmove')
		WIN.off('mouseup')
		WIN.off('touchend')
		// saveTimeline();
	}
	function currentHours () {
		var hours = 0;
		for (var i = $('.hour-picker').length - 1; i >= 0; i--) {
			hours += Number($('.hour-picker').eq(i).text().substr(5));
		};
		return hours;
	}
	function setWindowWidth(){
		// $('.window-slider').find($('.your-age')).html(Math.max(Number($('.you-slider').find($('.age')).text()),18-Number($('.son-slider').find($('.age')).text())+Number($('.you-slider').find($('.age')).text())))
		$('.window-slider').css({
			width: $('.timeline').width()*(getYearsLeft()/80),
			left: $('.you-slider').width() - $('.son-slider .age').width() - 8
		});
	}
	function changeTagline (message) {
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
	}
	function placeHashes(){
		for (var i = $('.hash').length - 1; i >= 0; i--) {
			$('.hash').eq(i).css({
				left: i*$('.timeline').width()/8
			})
		};
	}
})

function getTimeRemaining(endtime) {
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

function initializeClock() {
  clock = document.getElementById('clock');
  minus = document.getElementById('minus');
  startCountdown(0);
  setTimeout(function(){
  	minus.getElementsByTagName('h2')[0].classList.add('fade-in')
  	startCountdown(0);
  },1000)
  setTimeout(function(){
  	minus.getElementsByTagName('h2')[1].classList.add('fade-in')
  	startCountdown(47);
  },2000)
  setTimeout(function(){
  	minus.getElementsByTagName('h2')[2].classList.add('fade-in')
  	startCountdown(117);
  },5000)
  setTimeout(function(){
  	minus.getElementsByTagName('h2')[3].classList.add('fade-in')
  	startCountdown(150);
  },8500)
  setTimeout(function(){
  	minus.getElementsByTagName('h2')[4].classList.add('fade-in')
  	startCountdown(154);
  },11500)

}

function startCountdown (minusHours) {

	var endtime = new Date(Date.now() + ((yearsLeft * 365 * 24 * 60 * 60 * 1000)-((minusHours*52)*yearsLeft)*60*60*1000));
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateClock() {
	  var t = getTimeRemaining(endtime);

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
}
