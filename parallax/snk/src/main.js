'use strict';

var titan = new Parallax (
	document.getElementsByClassName('titan')[0], {
		scalarX: 0.2,
		scalarY: 0.2,
		friction: 500
	});
var armin = new Parallax (
	document.getElementsByClassName('armin')[0], {
		scalarX: 0.03,
		scalarY: 0.03,
		friction: 300
	});
var mikasa = new Parallax (
	document.getElementsByClassName('mikasa')[0], {
		scalarX: 0.15,
		scalarY: 0.08,
		friction: 300
	});
var eren = new Parallax (
	document.getElementsByClassName('eren')[0], {
		scalarX: 0.05,
		scalarY: 0.05,
		friction: 300
	});

var heroList = {};
	heroList['armin'] = {'width': 393, 'height': 593, 'x': 919, 'y': 50, 'scene': armin };
	heroList['eren'] = {'width': 735, 'height': 465, 'x': 465, 'y': 530, 'scene': eren };
	heroList['mikasa'] = {'width': 738, 'height': 602, 'x': 1139, 'y': 320, 'scene': mikasa };
	heroList['titan'] = {'width': 1647.30 , 'height': 1180, 'x': -50, 'y': -50, 'scene': titan };

function rescaleHeroes () {
	var clientHeight = document.documentElement.clientHeight;
	var clientWidth = document.documentElement.clientWidth;

	if (!clientWidth || !clientHeight) { return };

	var scale;
	if (clientWidth>clientHeight) {
		scale = clientHeight/1080;
	} else {
		scale = clientWidth/1920;
	};

	for (var prop in heroList) {
		resize (heroList[prop]);
		reposition (heroList[prop])
	};

	function resize (target) {
		var parallaxScene = target['scene'];
		var scene = parallaxScene['scene'];

		var newWidth = target.width*scale;
		var newHeight = target.height*scale;

		scene.style.width = newWidth + "px";
		scene.style.height = newHeight + "px";
	};

	function reposition (target) {
		var parallaxScene = target['scene'];
		var scene = parallaxScene['scene'];

		var currentX = target.x*scale;
		var currentY = target.y*scale;

		parallaxScene.defaultX = currentX;
		scene.style.left = currentX + "px";

		parallaxScene.defaultY = currentY;
		scene.style.top = currentY + "px";

		if (currentX<0) {
			parallaxScene.limitX = target.x*scale;
		};
		if (currentY<0) {
			parallaxScene.limitY = target.y*scale;
		};
	};

};
var timer;
function resizeFunction () {
	
	clearTimeout(timer);
	timer = setTimeout(rescaleHeroes, 500);

};

document.addEventListener ('DOMContentLoaded', rescaleHeroes);

window.addEventListener ('resize', resizeFunction);

document.ondragstart = function () {return false};
document.onselectstart = function () {return false};