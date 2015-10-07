$(function() {
	//Set variables
	var ul = $(".slider ul");
	var slideTotal = ul.children().length;
	var slideWitdh = 100.0 / slideTotal;
	var slideIndex = 0;
	var currentSlide = 0;
	var interval;
	var transitionSpeed = 500;
	var pause = 3000;

	//Dynamically set ul width to accomodate all slides
	ul.css({width:(100 * slideTotal) + "%"});

	//Find each lists in unordered list, set the css left position and width of each li element dynamically
	ul.find("li").each(function(indx){
		var leftPercent = (slideWitdh * indx) + "%";
		$(this).css({"left":leftPercent});
		$(this).css({width:(slideWitdh) + "%"});				
	});
	
	//Slideshow start function
	function startSlider() {
		interval = setInterval(function() {
			var marginLeftEach = (currentSlide * (-100)) + "%";
			ul.animate({'margin-left': marginLeftEach}, transitionSpeed, function() {
				console.log(currentSlide);
				if (++currentSlide === slideTotal) {
					currentSlide = 1;
					ul.animate({'margin-left': 0}, transitionSpeed, function(){})
				}
			});
		}, pause);
	};

	//Slideshow stop function
	function stopSlider() {
		clearInterval(interval);
		console.log("Slideshow paused!");
	}

	//Pause/Play slideshow on mouse events
	ul.on('mouseenter', stopSlider).on('mouseleave', startSlider);

	//Start slideshow
	startSlider();

	//Listening for Prev button click, then invoke slide(currentSlide - 1) function to move to the previous slide
	$(".slider .prev").click(function() {
		if (-currentSlide === 0) {
			ul.animate({'margin-left': 0}, transitionSpeed);
		} else { slide(currentSlide -= 1); }
		console.log(currentSlide);
	});

	//Listening for Prev button click, then invoke slide(currentSlide + 1) function to move to the next slide
	$(".slider .next").click(function() {
		if (+currentSlide === slideTotal-1) {
			currentSlide = 1;
			ul.animate({'margin-left': 0}, transitionSpeed);
		} else { slide(currentSlide += 1); }
		console.log(currentSlide);
	});

	//Listening for left & right key press, then invoke slide() function accordingly 
	$("body").keydown(function(e) {
		if(e.keyCode == 37) {
			if (-currentSlide === 0) {
				ul.animate({'margin-left': 0}, transitionSpeed);
			} else { slide(currentSlide -= 1); }
			console.log(currentSlide);	
		}
		else if(e.keyCode == 39) {
			if (+currentSlide === slideTotal-1) {
				currentSlide = 1;
				ul.animate({'margin-left': 0}, transitionSpeed);
			} else { slide(currentSlide += 1); }
			console.log(currentSlide);
		}
	});	

	//Function to execute slide on events, takes in paramemter 'newSLideIndex' to move to next or previous slide
	function slide(currentSlide) {
		if(currentSlide < 0 || currentSlide >= slideTotal) return;
		var marginLeftEach = (currentSlide * (-100)) + "%";
		ul.animate({"margin-left":marginLeftEach}, transitionSpeed, function() {
			slideIndex = currentSlide;
		});
	};
});