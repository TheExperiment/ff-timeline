$(function() {
	var WIN = $(window);
	var DOC = $(document);
	
	$('.slider').on('mousedown',function(e){
		alert('test')
		var slider = $(this)
		WIN.on('mousemove',function(e){
			slider.width = e.pageX
		})
	})
	
})