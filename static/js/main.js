window.addEventListener("DOMContentLoaded", function(){

"use strict";
<<<<<<< HEAD

	let popupBtn = document.getElementsByClassName("popup-btn")[0],
		formCustom = document.getElementsByClassName('custom')[0],
		overlay = document.getElementsByClassName('overlay')[0],
		customInfo = document.getElementsByClassName('custom-info')[0],
		customChar = document.getElementsByClassName('custom-char')[0],
		customStyle = document.getElementsByClassName('custom-style')[0],
		inputCustomInfo = customInfo.getElementsByTagName("input"),
		sex = document.getElementsByName('sex'),
		select = document.getElementById('select'),
		bio = document.getElementById('bio'),
		main = document.getElementsByClassName("main")[0],

		// скины
		personSkin = document.getElementById("person-skin"),
		skin = document.getElementsByClassName("skin"),
		skinColor = document.getElementsByClassName('skin-color'),
		hairStyle = document.getElementsByClassName('hair-style'),
		clothesStyle = document.getElementsByClassName('clothes-style'),
		prev = document.getElementsByClassName('prev'),
		next = document.getElementsByClassName('next');

	//var sliderIndexC = 1, sliderIndexH = 1;

	let person = {
		name: "Кандидат от народа",
		age: 20,
		sex: "Мужской",
		partia: "Либеральные",
		bio: "",
		sliderIndex: [
			1,
			1,
			1
		]
	};

	//let sliderIndex = [1,1];

	popupBtn.addEventListener('click',()=>{
		formCustom.style.display = 'flex';
		overlay.style.display = 'none';
		main.style.display = 'none';
		customInfo.style.display = 'block';
		customChar.style.display = 'block';
		customStyle.style.display = 'block';
	});

	inputCustomInfo[0].addEventListener('change', function(){
		person.name= this.value;
	});

	inputCustomInfo[1].addEventListener('change', function(){
		//console.log(typeof(parseInt(this.value));
		if(this.value<20 || this.value>90 || 
			typeof(parseInt(this.value)) !== "number" || isNaN(parseInt(this.value))){
			person.age = 20;	
		} else {person.age= parseInt(this.value);}

		console.log(person);
		
	});

	for(let i = 0; i< sex.length; i ++){
		sex[i].addEventListener('click', function(){
			person.sex= this.value;
			if(person.sex == "Мужской"){
				personSkin.style.background = 'url(./img/skin/skin-1.png) center no-repeat';
				personSkin.style.backgroundSize = 'cover';
			} else {
					personSkin.style.background = 'url(./img/skin/skin-4.png) center no-repeat';
					personSkin.style.backgroundSize = 'cover';
				}
			
		});
	}

	select.addEventListener('change', function(){
		person.partia= this.options[this.selectedIndex].value;
	});

	bio.addEventListener('change', function(){
		person.bio= this.value;
		console.log(person);
	});

    function showSlides(n,buf,btnBlClass){

      let index = searchIndex(btnBlClass);

      if(n > buf.length){
        person.sliderIndex[index] = 1;
      };

      if(n < 1){
        person.sliderIndex[index] = buf.length;
      };

      for(let i=0; i < buf.length;i++){
        buf[i].style.display = 'none';
      }
      console.log(person.sliderIndex[index] - 1);
      buf[person.sliderIndex[index] - 1].style.display = 'block';
    }

    function searchClass(b){
    	switch(b) {
    		case "skin-color":
    				return skinColor;
    				break;
    		case "hair-style":
    				return hairStyle;
    				break;
      		case "clothes-style":
    				return clothesStyle;
    				break;  	
    		}
    }

        function searchIndex(b){
	    	switch(b) {
	    		case "skin-color":
	    				return 0;
	    				break;
	    		case "hair-style":
	    				return 1;
	    				break;
	    	    case "clothes-style":
	    				return 2;
	    				break;
	    			}
    }

    function plusSlides(n, btnBlClass,x){

      let buf = searchClass(btnBlClass);
      showSlides(person.sliderIndex[x] += n, buf,btnBlClass);
    }


	for (let j = 0; j < prev.length; j++) {
			
			prev[j].addEventListener('click', function(){
				console.log(prev);
				plusSlides(-1,prev[j].nextElementSibling.classList[0],j);
			});
			next[j].addEventListener('click', function(){
				console.log(next[j]);
				console.log(next)
				plusSlides(1,next[j].previousElementSibling.classList[0],j);
			});


	}
=======
>>>>>>> 3dce674a811dfd62f8d6a61ba7ea1db83bf93f0c

});