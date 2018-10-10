window.addEventListener("DOMContentLoaded", function(){
	"use strict";
/*
let linkVideo = document.getElementsByClassName("playvideo"),
	videoPlay = document.getElementsByClassName("video-play"),
	myRe = new RegExp(/autoplay=1|&/gi);

for (let i = 0; i < linkVideo.length; i++) {
	
	linkVideo[i].addEventListener("mouseover",function(){
		 let symbol = videoPlay[i].src.indexOf("?") > -1 ? "&" : "?";
		 	 videoPlay[i].src+= symbol + "autoplay=1";
	});


	linkVideo[i].addEventListener("mouseout",function(){
		 let symbol = videoPlay[i].src;
		 	console.log(myRe);
		 	symbol= symbol.replace(myRe,"");
		 	console.log(symbol);
		 	videoPlay[i].src= symbol;
	});


	
}
*/

var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();


let btnSearch = document.getElementsByClassName("search-btn")[0],
	clickFlag = 0,
	blockSearch = document.getElementsByClassName("search")[0],
	btnSearchTop = document.getElementsByName("top"),
	btnSearchPrev = document.getElementsByName('prevS'),
	btnSearchNext = document.getElementsByName('nextS');

	blockSearch.style.display = 'none';
	hiddenBtnSearch();
function exchangeClass(classNameAdd, classNameRemove){
		blockSearch.classList.remove(classNameRemove);
		blockSearch.classList.add(classNameAdd);
}

function hiddenBtnSearch(){
	btnSearchTop[0].classList.add('none');
	btnSearchPrev[0].classList.add('none');
	btnSearchNext[0].classList.add('none');
}

function showBtnSearch(){
	btnSearchTop[0].classList.remove('none');
	btnSearchPrev[0].classList.remove('none');
	btnSearchNext[0].classList.remove('none');
}


btnSearch.addEventListener("click", function(){
	
	//this.disabled = true;

	if(clickFlag == 0){
		this.classList.add('rotate45');
		blockSearch.style.display = 'block';
		exchangeClass("slideInRight","slideOutRight");
		this.disabled = false;
		showBtnSearch()
		clickFlag = 1;

	} else if (clickFlag == 1) {

		this.classList.remove('rotate45');
		exchangeClass("slideOutRight","slideInRight");
		hiddenBtnSearch();
		setTimeout(function(){
			blockSearch.style.display = 'none';	
		},1000);
		
		clickFlag = 0;
	}


})

});