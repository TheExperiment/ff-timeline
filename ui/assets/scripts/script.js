var slider;
var userObj = {};
var resultingData;
var WIN = $(window);
var DOC = $(document);
var slider;
$(function() {

	if(window.location.hash) {
	  var timelineId = window.location.hash.split('#')[1];;
	  placeHashes()
	  WIN.on('resize',placeHashes)
	  setWindowWidth();
		getTimeline(timelineId);
	}
	else{
		placeHashes()
		WIN.on('resize',placeHashes)
		$('.slider').on('mousedown',startDrag)
		$('.slider').on('touchstart',startDrag)
		var youTimeout;
		var sonTimeout;
		$('.your-name').on('keyup',function(){
			clearTimeout(youTimeout);
			youTimeout = setTimeout(function(){
				$('.content').addClass('isYouName')
			},500)
		})
		$('.son-name').on('keypress',function(){
			clearTimeout(sonTimeout);
			sonTimeout = setTimeout(function(){
				$('.content').addClass('isSonName')
			},500)
		})
		$('.continue').on('click',function(){
			if(!$('.content').hasClass('isYouName')){
				$('.content').addClass('isYouName')
			}else if(!$('.content').hasClass('isBothNames')){
				$('.content').addClass('isBothNames')
				userObj.sonName = $('.son-name span').text();
				userObj.dadName = $('.your-name span').text();
				changeTagline('How Many Years Have<br> You Been On Earth?')
			}else{
				//TREVOR THIS IS THE FINAL CONTINUE. SUBMIT HERE
			}
		})
		$('.name').on('click',function(e){
			var name = $(this).find('span')
			name.html('.')
		})
		$('.son-name').find('span').on('focus',function(){
			var name = $(this)
			setTimeout(function(){
				name.prop('selectionStart', 0)
				name.text('.')
			},300)
		})
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
				var width = (WIN.width() - x - WIN.width()/10) - (WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width()));
				userObj.index = x;
				
				setWindowWidth();
			}
			slider.find($('.age')).html(Math.max(0,Math.floor(80*(width/$('.timeline').width()))));
			slider.css({
				width: Math.max(5,Math.min($('.timeline').width(),width))
			})
		}
		function onRelease (e) {
			console.log('release')
			WIN.off('mousemove')
			WIN.off('touchmove')
			WIN.off('mouseup')
			WIN.off('touchend')
			if(slider.hasClass('you-slider')){
				changeTagline('How Many Years Have<br> You Been On Earth <span class="window-years">Together?</span>')	
				$('.content').addClass("isSonAge");
				$('.son-slider').css({
					right: WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width())
				})
			}else{
				changeTagline('Your Window of Time<br>Together is <span class="window-years">' + (18-Number($('.son-slider').find($('.age')).text()))+' years.</span>')
				$('.window-slider').find($('.bar')).addClass('blink');
				userObj.dadAge = $('.you-slider .age').text();
				userObj.sonAge = $('.son-slider .age').text();
				// console.log(userObj)
				saveTimeline();
				setWindowWidth();
			}
		}
		function setWindowWidth(){
			$('.window-slider').find($('.your-age')).html(Math.max(Number($('.you-slider').find($('.age')).text()),18-Number($('.son-slider').find($('.age')).text())+Number($('.you-slider').find($('.age')).text())))
			$('.window-slider').css({
				width: $('.timeline').width()*((18-$('.son-slider').find($('.age')).text())/80),
				left: $('.you-slider').width()
			});
		}
		function changeTagline (message) {
			$('.tagline').css({
				'-webkit-transition-duration':'1s',
				'-webkit-filter':'blur(10px) opacity(10%)'
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
	}
})
