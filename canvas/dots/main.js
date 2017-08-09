var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

var qnt = 800;

(function () {

	var currentHeight,
			currentWidth,
			resizing = null;

	resizeCanvas();
	window.addEventListener('resize', onResize);

	function onResize (e) {
		clearTimeout(resizing);
		resizing = setTimeout(resizeCanvas, 300);
	};

	function resizeCanvas () {
		currentHeight = window.innerHeight;
		currentWidth = window.innerWidth;

		canvas.setAttribute('height', currentHeight);
		canvas.setAttribute('width', currentWidth);
	};

})();

Circle.prototype.canvas = canvas;
Circle.prototype.context = context;

Circle.prototype.colorArray = [
	'#2C3E50',
	'#E74C3C',
	'#ECF0F1',
	'#3498DB',
	'#2980B9'
];

for (var i=qnt; i--; i) {
	new Circle({
		radius: 15,
		maxRadius: 50,
		remote: 100} );
};

Circle.prototype.animate();
