var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

var radius = 5,
	start = 0,
	end = Math.PI*2;
context.lineWidth = radius*2;

(function () {

	var resizing = null;

	resizeCanvas();
	window.addEventListener('resize', onResize);

	function onResize (e) {
		clearTimeout(resizing);
		resizing = setTimeout (resizeCanvas, 500);
	};

	function resizeCanvas () {
			var height = document.documentElement.clientHeight;
			var width = document.documentElement.clientWidth;
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			context.lineWidth = radius*2;
	};

})();
