$(function() {
	var WIN = $(window);
	var DOC = $(document);
	
	$('.slider').on('mousedown',function(e){
		var slider = $(this)
		console.log(slider)
		WIN.on('mousemove',function(e){
			if(slider.hasClass('you-slider')){
				var width = e.pageX- slider.offset().left;
			}else{
				var width = (WIN.width() - e.pageX - WIN.width()/10) - (WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width()));
			}
			slider.find($('.age')).html(Math.floor(80*(width/$('.timeline').width())));
			slider.css({
				width: Math.min($('.timeline').width(),width)
			})
			WIN.on('mouseup',function(){
				WIN.off('mousemove')
				if(slider.hasClass('you-slider')){
					$('.son-slider').addClass("active");
					$('.son-slider').css({
						right: WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width())
					})
				}else{

				}
			})
		})
	})
})