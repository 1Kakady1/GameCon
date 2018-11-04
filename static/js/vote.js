let wrapStar = $(".vote > .star-wrap"),
	star = $(".fa-star");
console.log(star);
	star.hover(function(){
		console.log(this);
		star.toggleClass("far","fas");
	})