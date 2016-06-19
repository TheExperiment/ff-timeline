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
var isTouch;
var clock;
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
	$('.share').on('click',function(){
		prompt('This will link to your results', window.location.href);
	})
	$('.signup').on('click',function(){
		window.location.href = 'http://futurefather.co'
	})
	function startDragHour (e) {
		e.preventDefault();
		slider = $(this)
		if(e.type == 'touchstart'){
			startY = e.originalEvent.touches[0].pageY;
			console.log(startY)
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
	$('.hour-picker').on('touchstart',startDragHour)
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

	placeHashes()
	WIN.on('resize',placeHashes)
	$('.slider').on('mousedown',startDrag)
	$('.slider').on('touchstart',function(){
		isTouch = true;
	})
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
			Meteor.ffFunctions.changeTagline('How long have you been on Earth, ' + userObj.dadName + '?');
		}else{
			//TREVOR THIS IS THE FINAL CONTINUE. SUBMIT HERE
			console.log(userObj)
			alert('hello')
		}
	}
	function startDrag (e) {
		e.preventDefault();
		slider = $(this)
		WIN.on('mousemove',onMove)
		WIN.on('touchmove',onMove)
		WIN.on('mouseup',onRelease)
		WIN.on('touchend',onRelease)

		if(isTouch){
			slider.addClass('isDragging')
		}
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
			var width = (WIN.width() - x - WIN.width()/10) - (WIN.width()-$('.you-slider').width() + $('.son-slider .age').width()/2  - (WIN.width() - $('.timeline').width()));
			userObj.index = x;
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
		slider.removeClass('isDragging')
		if(slider.hasClass('you-slider')){
			Meteor.ffFunctions.changeTagline('How long has <span class="window-years his-name">'+userObj.sonName+'</span> been on Earth with you?')
			$('.content').addClass("isSonAge");
			$('.son-slider').css({
				right: (WIN.width() - $('.you-slider').width() - (WIN.width() - $('.timeline').width()) - $('.son-slider .age').width()/2) + $('.son-slider .age').width() + 8
			})
		}else{
			setTimeout(function(){
				yearsLeft = Meteor.ffFunctions.getYearsLeft();
				Meteor.ffFunctions.changeTagline(userObj.dadName+' and <span class="his-name">' +userObj.sonName + '</span> have <span class="window-years">');
				$('.window-slider').find($('.bar')).addClass('blink');
				userObj.dadAge = $('.you-slider .age').text();
				userObj.sonAge = $('.son-slider .age').text();
				console.log(userObj)
				// saveTimeline();
				Meteor.call('tasks.insert', userObj);
				clearTimeout(countdownTimer)
				$('.his-name').html(userObj.sonName);
				Meteor.ffFunctions.setIsCountdown();
			},1000)
		}
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
		slider.html("with " + Math.max(0,startHours + moved))
		clearTimeout(countdownTimer)
		Meteor.ffFunctions.startCountdown(currentHours())
	}
	function onReleaseHour (e) {
		WIN.off('mousemove')
		WIN.off('touchmove')
		WIN.off('mouseup')
		WIN.off('touchend')
	}
	function currentHours () {
		var hours = 0;
		for (var i = $('.hour-picker').length - 1; i >= 0; i--) {
			hours += Number($('.hour-picker').eq(i).text().substr(5));
		};
		return hours;
	}
	function setWindowWidth(){
		// $('.window-slider').css({
		// 	width: $('.timeline').width()*(Meteor.ffFunctions.getYearsLeft()/80),
		// 	left: $('.you-slider').width() - $('.son-slider .age').width()/2 - 8
		// });
	}
	function placeHashes(){
		for (var i = $('.hash').length - 1; i >= 0; i--) {
			$('.hash').eq(i).css({
				left: i*$('.timeline').width()/8
			})
		};
	}
})
