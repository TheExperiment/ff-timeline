var slider;
$(function() {
	var WIN = $(window);
	var DOC = $(document);
	placeHashes()
	WIN.on('resize',placeHashes)
	$('.slider').on('mousedown',startDrag)
	$('.slider').on('touchstart',startDrag)
	$('.show-timeline').on('click',function(){
		$('.content').addClass('isBothNames')
	})
	$('.name').on('click',function(){
		$(this).text('.')
	})
	function startDrag (e) {
		e.preventDefault();
		slider = $(this)
		WIN.on('mousemove',onMove)
		WIN.on('touchmove',onMove)
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
			setWindowWidth();
		}
		slider.find($('.age')).html(Math.max(0,Math.floor(80*(width/$('.timeline').width()))));
		slider.css({
			width: Math.max(5,Math.min($('.timeline').width(),width))
		})
		WIN.on('mouseup',onRelease)
		WIN.on('touchend',onRelease)
	}
	function onRelease (e) {
		WIN.off('mousemove')
		WIN.off('touchmove')
		if(slider.hasClass('you-slider')){
			$('.content').addClass("isSonAge");
			$('.son-slider').css({
				right: WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width())
			})
		}else{
			$('.window-years').html((18-Number($('.son-slider').find($('.age')).text()))+' years.')
			$('.window-slider').find($('.bar')).addClass('blink');
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
	function placeHashes(){
		for (var i = $('.hash').length - 1; i >= 0; i--) {
			$('.hash').eq(i).css({
				left: i*$('.timeline').width()/8
			})
		};
	}
})