(function () {

	var positiveSize = document.getElementsByClassName('positiveSize')[0];
	var negativeSize = document.getElementsByClassName('negativeSize')[0];
	var radiusView = document.getElementsByClassName('radiusView')[0];

	

	canvas.addEventListener ('mousedown', onMouseDown);
	canvas.addEventListener ('mouseup', stopDraw);
	canvas.addEventListener ('mouseout', stopDraw);

	positiveSize.addEventListener ('click', increaseSize);
	negativeSize.addEventListener ('click', decreaseSize);

	document.ondragstart = function (e) { return false };
	document.onselectstart = function (e) { return false };

	

	function increaseSize () {
		if (radius < 50) radius++;
		radiusView.textContent = radius;
		context.lineWidth = radius*2;
	};

	function decreaseSize () {
		if (radius > 1) radius--;
		radiusView.textContent = radius;
		context.lineWidth = radius*2;
	};

	function onMouseDown (e) {
		draw (e.clientX, e.clientY, radius, start, end);
		canvas.addEventListener ('mousemove', onMouseMove);
	};

	function onMouseMove (e) {
		draw (e.clientX, e.clientY, radius, start, end);
	};

	function stopDraw (e) {
		context.beginPath();
		canvas.removeEventListener ('mousemove', onMouseMove);
	};

	function draw (x, y, radius, start, end) {
		context.lineTo(x,y);
		context.stroke();
		context.beginPath();
		context.arc(x, y, radius, start, end);
		context.fill();
		context.beginPath();
		context.moveTo(x,y);
	};

})();
