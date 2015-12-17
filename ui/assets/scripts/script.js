var slider;
var userObj = {};
var resultingData;
var WIN = $(window);
var DOC = $(document);
var slider;
var paused;
color = 0;
$(function() {

	var particleInterval = setInterval(function(){
		if(!paused){
			$('.particles').append('<div class="particle"></div>')
			$('.particle').eq($('.particle').length-100).remove();
			$('.particle').eq($('.particle').length-1).css({
				'-webkit-transform': 'translate('+(Math.random()*(WIN.width()/4)-(WIN.width()/4)/2)+'px,'+(Math.random()*(WIN.height()/4)-(WIN.height()/2)/2)+'px)'
			})
			$('.particles').css({
				top: "+=.05px"
			})
		}else{
			// $('.particle').css({
			// 	width: 10,
			// 	height: 10
			// })
		}
	},20)

	WIN.on('keydown',function(){
		paused = true;
		setTimeout(function(){
			paused = false;
		},1000)
	})
	if(window.location.hash) {
	  var timelineId = window.location.hash.split('#')[1];
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
		$('.son-name').on('keypress',function(e){
			if(e.keyCode == 13){
				continueClick();
			}
			clearTimeout(sonTimeout);
			sonTimeout = setTimeout(function(){
				$('.content').addClass('isSonName')
			},500)
		})
		$('.continue').on('click',continueClick)
		$('.your-name span').focus();
		$('.name span').on('click',function(e){
			resetField()
			$('.content').addClass('isTyped')
		})
		$('.son-name span').on('focus',function(){
			var name = $(this)
			setTimeout(function(){
				name.prop('selectionStart', 0)
				resetField(name)
			},300)
		})
		function resetField(el){
			if(el.text() == 'What is your name?'){
				el.html('')
			}
			console.log(el.text())
			if(el.text() == 'What did you name your son?'){
				el.html('')
			}
			
		}
		function continueClick(){
			if(!$('.content').hasClass('isYouName')){
				$('.content').addClass('isYouName')
			}else if(!$('.content').hasClass('isBothNames')){
				$('.content').addClass('isBothNames')
				changeTagline('How many years have<br> you been on Earth?')
				userObj.sonName = $('.son-name span').text();
				userObj.dadName = $('.your-name span').text();
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
				changeTagline('How many years have<br> you been on Earth <span class="window-years">with '+userObj.sonName+'?</span>')	
				$('.content').addClass("isSonAge");
				$('.son-slider').css({
					right: WIN.width()-$('.you-slider').width() - (WIN.width() - $('.timeline').width())
				})
			}else{
				changeTagline(userObj.dadName+' and '+userObj.sonName+' have<br><span class="window-years">' + (18-Number($('.son-slider').find($('.age')).text()))+' more years together.</span>')
				$('.window-slider').find($('.bar')).addClass('blink');
				userObj.dadAge = $('.you-slider .age').text();
				userObj.sonAge = $('.son-slider .age').text();
				// console.log(userObj)
				saveTimeline();
				setWindowWidth();
			}
		}
		function setWindowWidth(){
			// $('.window-slider').find($('.your-age')).html(Math.max(Number($('.you-slider').find($('.age')).text()),18-Number($('.son-slider').find($('.age')).text())+Number($('.you-slider').find($('.age')).text())))
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

// // particles
// var system;

// function setup() {
//   createCanvas(window.innerWidth, window.innerHeight);
//   system = new ParticleSystem(createVector(width/2, height/2));
// }

// function draw() {
//   background(67,25,29);
//   system.addParticle();
//   system.run();
// }

// // A simple Particle class
// var Particle = function(position) {
//   this.acceleration = createVector(0, 0.05);
//   this.velocity = createVector(random(-1, 1), random(-1, 1));
//   this.position = position.copy();
//   this.lifespan = 25.0;
// };

// Particle.prototype.run = function() {
//   this.update();
//   this.display();
// };

// // Method to update position
// Particle.prototype.update = function(){
//   this.velocity.add(this.acceleration);
//   this.position.add(this.velocity);
//   this.lifespan -= 2;
// };

// // Method to display
// Particle.prototype.display = function() {
// 	strokeWeight(0)
//   fill(189,33,50, this.lifespan);
//   ellipse(this.position.x, this.position.y, 222, 222);
// };

// // Is the particle still useful?
// Particle.prototype.isDead = function(){
//   if (this.lifespan < 0) {
//     return true;
//   } else {
//     return false;
//   }
// };

// var ParticleSystem = function(position) {
//   this.origin = position.copy();
//   this.particles = [];
// };

// ParticleSystem.prototype.addParticle = function() {
//   this.particles.push(new Particle(this.origin));
// };

// ParticleSystem.prototype.run = function() {
//   for (var i = this.particles.length-1; i >= 0; i--) {
//     var p = this.particles[i];
//     p.run();
//     if (p.isDead()) {
//       this.particles.splice(i, 1);
//     }
//   }
// };
