$(document).ready(function(){
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
var height = $(window).height();
var inView = 1;
var animating = false;

if(window.location.pathname != "/") {
	$("header").css("color", "#000")
}


$(".page:first-child").children(".image").addClass("pActive");

$(".logo").on("click", function(){
	inView = 2;
	scrollUp();
})

function scrollDown() {
	if(!animating){
		animating = true;
		if($("footer").hasClass("fActive")){
			animating = false;
			console.log("already at end");
			return;
		}
		else if($(window).scrollTop() == $(".page:last-child").offset().top) {
			$("footer").addClass("fActive");
			$("html, body").animate({
				scrollTop: $(document).height(),

			}, 1000, "easeInOutQuint", function(){
				animating= false
			})
			
			return;
		}

		else {
			inView++;
			$("html, body").animate({
				scrollTop: $(".page:nth-child(" + inView +")").offset().top
			}, 1000, "easeInOutQuint", function(){
				$(".navigation").css("margin-top", "-=40px")
				$(".navigation p:nth-child(" + (inView - 1) + ")").css("opacity", "1");
				$(".navigation p:nth-child(" + inView + ")").css("opacity", "0")
				$(".page:nth-child(" + (inView - 1) +")").children(".image").removeClass("pActive");
				$(".page:nth-child(" + inView +")").children(".image").addClass("pActive");
				animating = false;
				
			});
		}
	}
}
function scrollUp() {
	
	if(!animating){
		animating = true;
		if($(window).scrollTop() == 0) {
			console.log("already at top");
			animating= false;
			return;

		}
		else if($("footer").hasClass("fActive")){
			$("footer").removeClass("fActive");
			setTimeout(function(){
				animating= false;
			}, 300)

		}
		else {
		inView--;
		$("html, body").animate({
			scrollTop: $(".page:nth-child(" + inView +")").offset().top

		}, 1000, "easeInOutQuint", function(){
			$(".navigation").css("margin-top", "+=40px")
			$(".navigation p:nth-child(" + (inView + 1) + ")").css("opacity", "1");
			$(".navigation p:nth-child(" + inView + ")").css("opacity", "0");
			$(".page:nth-child(" + (inView + 1) +")").children(".image").removeClass("pActive");
			$(".page:nth-child(" + inView +")").children(".image").addClass("pActive");
			animating = false;

		})
	}
	}
}


$(window).bind("mousewheel", function(event){
		if(event.originalEvent.wheelDelta>=0){
			console.log("scroll up");
			console.log(inView)
			
			scrollUp();

		}
		else {
			console.log("scroll down");
			scrollDown();
			
		}
		event.preventDefault();
});

var timer;
$(document).on("scroll", function(){

	clearTimeout(timer);
	if(!animating){
	timer = setTimeout(function(){
		var offset = $(window).scrollTop();
		if(offset <= height/2) {
			inView=2;
			scrollUp();
			inView=1;
		}
		else if(offset >= height/2 && offset <= height ){			
			scrollDown();
		}
		else if(offset >= height && offset <= height + height/2){
			inView = 3;
			scrollUp();
			inView = 2;
		}
		else {
			inView = 2;
			scrollDown();
		}
	}, 66)
	}
})
});
