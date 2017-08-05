var colorPick = document.getElementById('colorPick');
colorPick.addEventListener ('click', sampleClick);

var colorList = colorPick.getElementsByClassName('colorTest');
var colorSample = document.getElementById('colorSample');

var open = false;

setColor( document.getElementsByClassName('choose')[0].style.backgroundColor );

function sampleClick (e) {

	var target = e.target.closest('.colorTest') || e.target.closest('#colorSample');
	var color;

	if ( !target ) {return};

	var status;

	if (!open) {
		if (target != colorSample) {return};
		status = 'block';
		open = true;
		colorSample.style.display = 'none';
	} else {
		colorSample.style.display = '';
		status = '';
		open = false;
	};

	for (var i=colorList.length; i--; i) {
		if (target != colorSample) { colorList[i].classList.remove('choose') };
		colorList[i].style.display = status;
	};

	if (target == colorSample) {return};

	target.classList.add('choose');
	
	setColor( target.style.backgroundColor );
	
};

function setColor (color) {
	colorSample.style.backgroundColor = color;

	context.fillStyle = color;
	context.strokeStyle = color;
};
