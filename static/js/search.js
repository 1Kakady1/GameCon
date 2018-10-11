"use strict";
/* =============================== 
			настройки
   ==============================*/ 

	let 	style = {
				cssClassX: "red", // класс, который указан в стилях для цвета текста
				cssClassY: "bg", // класс, который указан в стилях для обводки текста
				colorBg: "#FFEB3B", // цвет background
				colorText: "#00bcd4", // цвет результата поиска
			},	

			workTransition = 0, // 0 - циклически,
								// 1 - с выводом сообщения
			msgEndP= "End", // сообщение конца строки назад ( при workTransition = 1)
			msgEndN= "End", // сообщение конца строки вперед ( при workTransition = 1)
			nameClassOnSearch = 'search', // название класса для поиска (устанавливать тегам с нужным текстом)
			workSearch = 1, // 1 - поиск по body
							// 0 - поиск по классу
			searchForEvent = 'change', // keyup - переход сразу к найденному слову. Поиск по одному слову или через встаку по множеству
									  // change - переход к первому слову из множества. Поиск по слову или по множеству слов
			createElement = {
				createStyle: 0,  // создать стили 1-да, 0-нет
				createBtnTop: 1, // создать кнопку прокрутки к поиску 1-да, 0-нет
				createBtnPN: 1,  // создать кнопки прохода по результатам поиска 1-да, 0-нет
			}
//================================

onCreate();

let searchForm = document.getElementsByName('search'),
	searchContent = document.getElementsByClassName(nameClassOnSearch),
	arrayDOM = {
		posDom: [],
		spanSearch: [],
		contentInHtml: [],
	}, 

	sFlag = 0, flag = 0, indexBtnClick = 0,countSearch = 0,
	arrayBufContent = [],

	btn = document.getElementsByName('top'),
	arrowPrev =document.getElementsByName('prevS') ,
	arrowNext =document.getElementsByName('nextS'),
	arrow = document.getElementsByClassName('arrow')[0],
	body = document.getElementsByTagName('body')[0].childNodes;


	// input для поиска
	searchForm[0].addEventListener(searchForEvent, function(event){
		var time = performance.now();
		sFlag = 0;countSearch=0;
		сlearColor();

		if(this.value == null || this.value == 0){
			this.value	="";
			isAlertWork("По запросу найдено 0")
			arrow.style.display = 'none';
		} else {

			let splitSearchForm = this.value.split(" ");
			arrow.style.display = 'flex';
			
			for (let i = 0; i < splitSearchForm.length; i++) {
				
				if(workSearch == 0) {
					searchOnClass(splitSearchForm[i]);	
				} else {
					let repTokenS = splitSearchForm[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
					searchNode(body,repTokenS.toUpperCase());
				}
				
				
			}

			if(sFlag == 0) {
				isAlertWork("По запросу найдено 0")
				arrow.style.display = 'none';
			} else { 
						
						let pref = alertContent(countSearch);
						arrayDOM.spanSearch = document.getElementsByClassName(style.cssClassX);
						isAlertWork(`По запросу найдено: ${countSearch} ${pref}`);
						arrayDOM.spanSearch[0].classList.add(style.cssClassY);
						time = performance.now() - time;
						console.log('Время выполнения = ', time);
					}
		}
	});

	// отключаем действие по enter
	searchForm[0].addEventListener('keydown', function(event) {
	    if(event.keyCode == 13) {
	       event.preventDefault();
	    }
 	});


if( btn.length != 0){

	// кнопки для scroll
 	btn[0].addEventListener('click', function(event){
 		event.preventDefault();
 		scrollToElement(3,searchForm[0]);
 	});
 }

if(arrowPrev.length != 0 && arrowNext.length != 0){
 
 	// кнопки перехода
 	arrowPrev[0].addEventListener('click', function(event){
 		event.preventDefault();
 		plusSpan(-1);
 	});

 	arrowNext[0].addEventListener('click', function(event){
 		event.preventDefault();
 		plusSpan(1);
 	}); 
}

	function scrollToElement(a,b) {

    let selectedPosX = 0,
     	selectedPosY = 0,
		theElement = null,
		buf = b;

	switch(a) {
		case 0:
			theElement = searchContent[arrayDOM.posDom[0]];
			break;
		case 1:
			theElement = body[arrayDOM.posDom[0]];
			break;
		case 3:
			theElement = b;
			break;

	}
    while (theElement != null) {
        selectedPosX += theElement.offsetLeft;
        selectedPosY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }
                 		      
    window.scrollTo({ top: selectedPosY, left: selectedPosX, behavior: 'smooth', block: 'start',inline: 'nearest' });

}

	function isDomContent(j,str){
		for (let i = 0; i < arrayDOM["posDom"].length; i++) {
			if(arrayDOM.posDom[i] == j ){
				flag = 1;
				break;
			}
		}

			if(flag == 0){
				arrayDOM.posDom.push(j);
				arrayDOM.contentInHtml[j] = str;
			}

	}

	function searhOnJoin(elemSearh,arr){

		let bufMass = replaceStr(arr);
				//	console.log(bufMass);
				//	exit();
		for (let i = 0; i < bufMass.length; i++) {
			bufMass[i]=bufMass[i].replace(/\s/g, '');
			if(bufMass[i] == ""){
				bufMass.splice(i, 1);
				i--;
			} else {
					if ( bufMass[i].toUpperCase() == elemSearh.toUpperCase() && bufMass[i-1] !=`class="${style.cssClassX}">`) {
						bufMass[i] = `<mark class="${style.cssClassX}">${elemSearh}</mark>`;
						countSearch++;
					}
			}
		}
		return bufMass;
	}


	function replaceStr(str){

		let rStr = str.replace(/</g, " <");
			rStr = rStr.replace(/>/g, "> ");
			rStr = rStr.replace(/[\n\r]+/g, ' ');
			rStr = rStr.split(" ");
			return rStr;
	}

	function сlearColor(){
		if(arrayDOM.posDom.length > 0){
			for (let i = 0; i < arrayDOM.posDom.length; i++) {
				if(workSearch == 0) {
					searchContent[arrayDOM.posDom[i]].innerHTML = arrayDOM.contentInHtml[arrayDOM.posDom[i]];
				} else {
					body[arrayDOM.posDom[i]].innerHTML = arrayDOM.contentInHtml[arrayDOM.posDom[i]];	
				}
				
				
			}

		clearStyleBg(arrayDOM.spanSearch.length, 0);

		countSearch=0;
		indexBtnClick = 0;
		
		arrayDOM.posDom = [];
		arrayDOM.spanSearch = [];
		arrayDOM.contentInHtml = [];


	}
}

	function searchOnClass(searchText){

		for (let i = 0; i < searchContent.length; i++) {

				let buf = replaceStr(searchContent[i].innerText);
				for(let j = 0; j < buf.length; j++ ){
					buf[j] = buf[j] .replace(/\s/g, '');
					let repToken = buf[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),
						repTokenSearch = searchText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

					if(repToken.toUpperCase() == repTokenSearch.toUpperCase()){

						let sBuf = searchContent[i].innerHTML;
						let onJoin = searhOnJoin(buf[j],searchContent[i].innerHTML);

						searchContent[i].innerHTML = onJoin.join(' ');
						
						flag = 0; sFlag = 1;//countSearch++;

						isDomContent(i,sBuf);
						}
					}
		}
	}

 	function searchNode(nodeMyChild,searchText){

 		for(let i = 0 ; i< nodeMyChild.length; i++){
 			
 			if(nodeMyChild[i].nodeName != "SCRIPT" && nodeMyChild[i].nodeName != "#text" && nodeMyChild[i].nodeName != "BUTTON" && nodeMyChild[i].innerText != undefined){
	 			
	 			if( nodeMyChild[i].childNodes.length != 0 && nodeMyChild[i].innerText != ""){

	 				let buf = replaceStr(nodeMyChild[i].innerText); 
	 						    
						for(let j = 0; j < buf.length; j++ ){

						buf[j] = buf[j].replace(/\s/g, '');

						if( buf[j] !="" && buf[j] != null  || buf[j] != undefined){
							let repToken = buf[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
						//	console.log(buf[j]);console.log(repToken);
							if(repToken.toUpperCase() == searchText){

								let sBuf = nodeMyChild[i].innerHTML;
								let onJoin = searhOnJoin(buf[j],nodeMyChild[i].innerHTML);

								nodeMyChild[i].innerHTML = onJoin.join(' ');
								
								flag = 0; sFlag = 1;

								isDomContent(i,sBuf);
								}
							}
						}
					
	 				searchNode(nodeMyChild[i].childNodes);
	 			}
 			}
 		}
 	}

 	function isAlertWork(str){
 		
 		if(searchForEvent == 'change'){
 			
 			alert(str);
	 		setTimeout(function(){
				scrollToElement(workSearch,null);
	 		},100)
 		} else {
 			scrollToElement(workSearch,null);
 				}
 	}

	function alertContent(x){

		switch(x) {
			case 1:
				return "совпадение";
				break;
			case 2,3,4:
				return "совпадения";
				break;
			default:
				return "совпадений";
				break;
		}
	}	

 	function clearStyleBg(index, clearBg){
 		for(let i = 0; i < arrayDOM.spanSearch.length ; i++ ){
 			arrayDOM.spanSearch[i].classList.remove(style.cssClassY);	
 		}

 		if(clearBg == 1){
			arrayDOM.spanSearch[index].classList.add(style.cssClassY);
 		}
 		
 		
 	}

 	function isIndexBtnClick(n){

 		if(n == arrayDOM.spanSearch.length){
 			if(workTransition == 0){
 				indexBtnClick = 0;
 				n=0;
 			}else {
						alert(msgEndN);
						indexBtnClick = arrayDOM.spanSearch.length-1;
 				  }
 		} 

 		if(n < 0){
 			if(workTransition == 0){
 					indexBtnClick = arrayDOM.spanSearch.length-1;
 					n = arrayDOM.spanSearch.length-1;
 			}else {
					alert(msgEndP);
					indexBtnClick = 0;
 				  }
 		}

 		if(n >= 0 && n < arrayDOM.spanSearch.length)
 		{
 			clearStyleBg(indexBtnClick,1);
 			scrollToElement(3,arrayDOM.spanSearch[indexBtnClick]);
 			
 		}
 	}

 	function plusSpan(n){
 		isIndexBtnClick(indexBtnClick += n);
 	}

	function createStyle(){
		let styleElem = document.createElement('style');
		styleElem.type = 'text/css';
		styleElem.innerHTML = `
		.margin-top{margin-top: 500px;}
		a, a:hover, button, button:hover, .anime {
			  -moz-transition: all 200ms linear;
			  -ms-transition: all 200ms linear;
			  -o-transition: all 200ms linear;
			  -webkit-transition: all 200ms linear;
			  transition: all 200ms linear;
			  cursor: pointer; 
			}
			.${style.cssClassX}{color: ${style.colorText}!important;font-size: 13px!important;padding-left:0!important;}
			.${style.cssClassY}{background: ${style.colorBg}!important;}
			.btn-fixed {
				position: fixed;
			    right: 33px;
			    width: 60px;
			    height: 60px;
			    z-index: 4;
			    border-radius: 30px;
			    border: none;
			    background: rgb(228, 224, 224);
			    outline:none;
			}

			.btn-fixed:hover,.arrow .arrow-prev:hover, .arrow .arrow-next:hover{

				background: rgb(239, 216, 216);
				width: 57px;
			    height: 57px;


			}

			.btn-fixed svg, .arrow svg {
				width: 100%;
			    height: 100%;
			}

			.arrow{
				display: none;
			    justify-content: flex-end;
			    position: fixed;
			    right: 30px;
			    top: 90px;
			    z-index: 4;
			}

			.arrow .arrow-prev, .arrow .arrow-next {
				width: 30px;
				height: 30px;
			    border-radius: 30px;
			    border: none;
			    background: rgb(228, 224, 224);
			    outline:none;
			    margin-right: 2px;
			}`;
		document.getElementsByTagName('head')[0].appendChild(styleElem);
	}

	function createBtnPN() {

	  let addBtn = document.createElement('div');
	  addBtn.className = 'arrow';
	  addBtn.innerHTML = `
				<button name = "prevS" class = "arrow-prev" type = "submit">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							 viewBox="0 0 477.175 477.175" xml:space="preserve">
							<path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
								c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>
						</svg>
				</button>

				<button name = "nextS" class = "arrow-next" type = "submit">
					<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						 viewBox="0 0 477.175 477.175" xml:space="preserve">
						<path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
							c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
							"/>
					</svg>
				</button>	
	  `;

			let body = document.getElementsByTagName('body')[0];
				body.insertBefore(addBtn,body.children[1]);
	}

	function createBtnTop(){
		let addBtnTop = document.createElement('button');	
			addBtnTop.type = 'submit';
			addBtnTop.name = 'top';
			addBtnTop.className = 'btn-fixed';
			
			addBtnTop.innerHTML =`
			<svg version="1.1" id="search" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 284.929 284.929"
				 xml:space="preserve">
					<path d="M17.128,167.872c1.903,1.902,4.093,2.854,6.567,2.854c2.474,0,4.664-0.952,6.567-2.854L142.466,55.666l112.208,112.206
						c1.902,1.902,4.093,2.854,6.563,2.854c2.478,0,4.668-0.952,6.57-2.854l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.563
						c0-2.475-0.951-4.665-2.847-6.567L149.028,7.419c-1.901-1.906-4.088-2.853-6.562-2.853s-4.665,0.95-6.567,2.853L2.856,140.464
						C0.95,142.367,0,144.554,0,147.034c0,2.468,0.953,4.658,2.856,6.561L17.128,167.872z"/>
					<path d="M149.028,117.055c-1.901-1.906-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,250.1
						C0.95,252.003,0,254.192,0,256.67c0,2.472,0.953,4.661,2.856,6.564l14.272,14.276c1.903,1.903,4.093,2.848,6.567,2.848
						c2.474,0,4.664-0.951,6.567-2.848l112.204-112.209l112.208,112.209c1.902,1.903,4.093,2.852,6.563,2.852
						c2.478,0,4.668-0.948,6.57-2.852l14.274-14.276c1.902-1.903,2.847-4.093,2.847-6.564c0-2.478-0.951-4.667-2.847-6.57
						L149.028,117.055z"/>
			</svg>
			`;

			let body = document.getElementsByTagName('body')[0];
				body.insertBefore(addBtnTop,body.children[0]);
	}

	function onCreate()
	{
		if(createElement.createStyle == 1) createStyle();	
		if(createElement.createBtnTop == 1) createBtnTop();
		if(createElement.createBtnPN == 1) createBtnPN();	
	}