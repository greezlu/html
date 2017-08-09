function Circle (options) {

	this.radius = options.radius;
	this.color = options.color || this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
	this.currentRadius = options.radius;
	this.maxRadius = Math.random() * (options.maxRadius - options.radius) + options.radius*2 || options.radius;
	this.remote = options.remote;
	this.update();

	this.x = Math.random() * (this.innerWidth-this.radius*2)+this.radius;
	this.y = Math.random() * (this.innerHeight-this.radius*2)+this.radius;
	this.dx = ( (Math.random()-0.5) * 3);
	this.dx < 0 ? this.dx-- : this.dx++;
	this.dy = ( (Math.random()-0.5) * 3);
	this.dy < 0 ? this.dy-- : this.dy++;

	this.circleArray.push (this);

};

Circle.prototype.circleArray = [];
Circle.prototype.colorArray = [];

Circle.prototype.mouseX = null;
Circle.prototype.mouseY = null;

(function () {

	var stop = false;

	Circle.prototype.stop = function () {
		stop = true;
		return stop;
	};

	Circle.prototype.animate = function () {

		if (stop) {
			stop = false;
			return;
		};

		Circle.prototype.context.clearRect(0, 0, Circle.prototype.innerWidth, Circle.prototype.innerHeight);

		var arr = Circle.prototype.circleArray;

		for (var i=arr.length; i--; i) {

			var circle = arr[i];
			var distance = Math.sqrt(
					Math.pow(Circle.prototype.mouseX - circle.x, 2)
					+ Math.pow(Circle.prototype.mouseY - circle.y, 2)
			);

			if ( distance < circle.radius + circle.remote ) {
				if (circle.currentRadius < circle.maxRadius){
					circle.currentRadius += 3;		
				};	
			} else {
				if (circle.currentRadius > circle.radius) {
					circle.currentRadius -= 1;
				};
			};

			if ( circle.x >= circle.innerWidth-circle.currentRadius ) {
				circle.dx = -Math.abs(circle.dx);
			} else if (circle.x <= circle.currentRadius) {
				circle.dx = Math.abs(circle.dx);
			};

			if ( circle.y >= circle.innerHeight-circle.currentRadius ) {
				circle.dy = -Math.abs(circle.dy);
			} else if (circle.y <= circle.currentRadius) {
				circle.dy = Math.abs(circle.dy);
			};

			circle.x += circle.dx;
			circle.y += circle.dy;

			circle.context.beginPath();
			circle.context.arc(circle.x, circle.y, circle.currentRadius, 0, Math.PI*2);
			circle.context.fillStyle = circle.color;
			circle.context.fill();

		};

		requestAnimationFrame (Circle.prototype.animate);

	};

})();



(function () {

	var resizing = null;

	Circle.prototype.update = onResize;

	Circle.prototype.resize = function (e) {
		clearTimeout(resizing);
		resizing = setTimeout(onResize, 1000);
	};

	function onResize () {
		if (!Circle.prototype.canvas) {return false};
		Circle.prototype.innerHeight = Number( Circle.prototype.canvas.getAttribute('height') );
		Circle.prototype.innerWidth = Number( Circle.prototype.canvas.getAttribute('width') );
	};

	window.addEventListener('resize', Circle.prototype.resize);

})();

(function () {

	Circle.prototype.mouseX = undefined;
	Circle.prototype.mouseY = undefined;

	document.addEventListener('mousemove', mouseMove);

	var hover = false;

	document.addEventListener('mouseout', mouseLeave);
	document.addEventListener('mouseover', mouseCome);

	function mouseLeave (e) {
		if (!e.relatedTarget) {
			document.removeEventListener('mousemove', mouseMove);
			Circle.prototype.mouseX = undefined;
			Circle.prototype.mouseY = undefined;
			hover = false;
		};
	};

	function mouseCome (e) {
		if (!hover) {
			hover = true;
			document.addEventListener('mousemove', mouseMove);
		};
	};

	function mouseMove (e) {
		Circle.prototype.mouseX = e.clientX;
		Circle.prototype.mouseY = e.clientY;
	};

})();
