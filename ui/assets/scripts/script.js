$(function() {
	var WIN = $(window);
	var DOC = $(document);
	placeHashes()
	WIN.on('resize',placeHashes)
	$('.slider').on('mousedown',function(e){
		e.preventDefault();
		var slider = $(this)
		
		WIN.on('mousemove',function(e){
			if(slider.hasClass('you-slider')){
				$('.you-slider').addClass("inactive");
				var width = e.pageX - slider.offset().left;
			}else{
				$('.son-slider').addClass("inactive");
				$('.window-slider').addClass('active')
				var width = (WIN.width() - e.pageX - WIN.width()/10) - (WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width()));
				setWindowWidth();
			}
			slider.find($('.age')).html(Math.max(0,Math.floor(80*(width/$('.timeline').width()))));
			slider.css({
				width: Math.max(5,Math.min($('.timeline').width(),width))
			})
			WIN.on('mouseup',function(){
				WIN.off('mousemove')
				if(slider.hasClass('you-slider')){
					$('.son-slider').addClass("active");
					$('.son-slider').css({
						right: WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width())
					})
				}else{
					$('.window-years').html((18-Number($('.son-slider').find($('.age')).text()))+' years.')
					$('.window-slider').find($('.bar')).addClass('blink');
					setWindowWidth();
				}
			})
		})
	})
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