var sample;
var container = document.getElementsByClassName('container')[0];
var main = document.getElementsByClassName('main')[0];
var stat = document.getElementsByClassName('stat')[0];
// Create prototype DOM Object
(function () {
	sample = document.createElement ('div');
	sample.classList.add ('game');
	var nameElem = document.createElement ('div');
	nameElem.classList.add ('name');
	sample.appendChild (nameElem);
	var graphElem = document.createElement ('div');
	graphElem.classList.add ('graph');
	sample.appendChild (graphElem);
})();
// Create scale
(function(){
	for (var i=0; i<=60000; i=i+3000) {
		var newCount = document.createElement('div');
		newCount.classList.add('count');
		if (i>=1000) {
			newCount.textContent = Math.round(i/1000) + "k"
		} else {
			newCount.textContent = Math.round(i/1000);
		};
		stat.appendChild(newCount);
	};
})();
// Create vertical lines 
(function(){
	var navi = document.getElementsByClassName('navi')[0];
	for (var i=0; i<=20; i++) {
		var segment = document.createElement('div');
		segment.classList.add('navi_line');
		segment.style.left = 234+(50*i)+"px";
		navi.appendChild(segment);
	};
})();
// Create, sort and append "Game Elements"
(function () {
	var nodeList = [];
	for (key in gameList) {
		createElem (gameList, key);
	};
	
	shakeSort(nodeList);
	nodeList.forEach (function (game) {
		main.appendChild(game);
	});	
	
	function createElem (obj, key) {
		var elem = sample.cloneNode(true);
		var graph = elem.getElementsByClassName('graph')[0];
		elem.getElementsByClassName('name')[0].textContent  = key;
		var count = (1000/60000 * obj[key])-2;
		if (count<1) {
			count = 1;
		} else if (count>998) {
			count = 998;
		};
		graph.style.width = count + "px";
		var span = document.createElement('span');
		span.classList.add('currentNumber');
		span.textContent = String(obj[key]).replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, " $1 ");
		if (obj[key] < 6000) {
			elem.appendChild(span);
		} else {
			graph.appendChild(span);
		};
		if (obj[key] > 60000) {span.style.fontWeight = '500';};
		nodeList.push(elem);
	};
	function shakeSort (a) {
		var m=0, L, j = a.length-1;
		while (m<j)
		{
			for ( var i=m; i<j; i++ )
			{
				if ( cnt(a[i]) < cnt(a[i+1]) )
				{
					L=a[i];	a[i]=a[i+1]; a[i+1]=L;				
				}
			};
			j--;
			for ( var i=j; i>m; i-- )
			{
				if ( cnt(a[i]) > cnt(a[i-1]) )
				{
					L=a[i];	a[i]=a[i-1]; a[i-1]=L;					
				}
			};
			m++;
		};
		return a;
		function cnt (elem) {
			var num = elem.getElementsByClassName('currentNumber')[0];
			var reg = new RegExp(/ /g); 
			var result = num.textContent.replace(reg, ''); 
			return Number(result);
		};
	};
})();
// Drag and drop / setCenter
(function () {
	container.addEventListener ('mousedown', mouseDown);
	document.documentElement.addEventListener ('mousedown', deleteCard);
	document.documentElement.onselectstart = function (e) {return false};
	document.documentElement.ondragstart = function(e) {return false};
	var isHover = false;
	var shiftX, shiftY;
	var maxY, maxX;
	var scrollHeight, scrollWidth;
	getSize ();
	(function () {
		container.style.top = (scrollHeight - container.offsetHeight)/2 + "px";
		container.style.left = (scrollWidth - container.offsetWidth)/2 + "px";
	})();
	function mouseDown (e) {
		shiftX = e.pageX - getCoords(container).left;
		shiftY = e.pageY - getCoords(container).top;
		document.body.style.overflow = "hidden";
		
		getSize ();
		maxY = scrollHeight
		+ window.pageYOffset
		- container.offsetHeight;
		maxX = scrollWidth
		+ window.pageXOffset
		- container.offsetWidth;
		container.addEventListener ('mousemove', mouseMove);
		container.addEventListener ('mouseup', mouseUp);
	};
	function mouseUp (e) {
		document.body.style.overflow = "auto";
		container.removeEventListener ('mouseup', mouseUp);
		container.removeEventListener ('mousemove', mouseMove);
	};
	function mouseMove (e) {
		if (e.pageX>(scrollWidth-5)) { mouseUp(e); return; };
		if (e.pageY>=(scrollHeight-5)) { mouseUp(e); return; };
		var currentX = e.pageX - shiftX,
		currentY = e.pageY - shiftY;
		if (currentX > maxX) {
			currentX = maxX;
		} else if (currentX<0) {
			currentX = 0;
		};
		if (currentY > maxY) {
			currentY = maxY;
		} else if (currentY<0) {
			currentY = 0;
		};
		container.style.left = currentX + "px";
		container.style.top = currentY + "px";
	};
	function getSize () {
		scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
			);
		scrollWidth = Math.max(
			document.body.scrollWidth, document.documentElement.scrollWidth,
			document.body.offsetWidth, document.documentElement.offsetWidth,
			document.body.clientWidth, document.documentElement.clientWidth
			);
	};
	function getCoords(elem) {
		var box = elem.getBoundingClientRect();
		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	};
	function deleteCard (e) {
		var card = document.getElementsByClassName('card')[0];
		card.remove();
		document.documentElement.removeEventListener ('mousedown', deleteCard);
	};
})();
