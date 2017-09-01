var lineClassName = 'line';
var contentIdName = 'content';

(function () {
	
var line = document.getElementsByClassName(lineClassName)[0];
var content = document.getElementById(contentIdName);

var hoveredCountry,
		hoveredImport,
		hoveredExport;

for (var key in data) {
	createCountryLine( data[key], key );
};

content.removeChild(line);

content.addEventListener ('mousemove', onMouseMove);
content.addEventListener ('mouseout', onMouseLeave);
content.addEventListener ('click', onMouseClick);

function onMouseMove (e) {

	var target = e.target,
			currentLine = target.closest('.line');

	if ( !currentLine ) {
		clearHoveredLine();
		return;
	};

	if ( currentLine.classList.contains('active') ) {	

		if ( hoveredCountry ) {
			clearHoveredLine();
		};

		if (hoveredImport) {

			if ( target.closest('.import') ) {

				if ( target.closest('.import') !== hoveredImport ) {

					removeClass(hoveredImport.parentElement, 'import', 'activeLarge');
					addClass(hoveredImport.parentElement, 'import', 'activeSmall');

					addClass(currentLine, 'import', 'activeLarge');
					removeClass(currentLine, 'import', 'activeSmall');

					hoveredImport = target.closest('.import');
				};

			} else {
				removeClass(hoveredImport.parentElement, 'import', 'activeLarge');
				addClass(hoveredImport.parentElement, 'import', 'activeSmall');
				addClass(currentLine, 'import', 'activeSmall');
				hoveredImport = null;
			};

		} else {

			if ( target.closest('.import') ) {
				removeClass(currentLine, 'import', 'activeSmall');
				addClass(currentLine, 'import', 'activeLarge');
				hoveredImport = target.closest('.import');
			};

		};

		if (hoveredExport) {

			if ( target.closest('.export') ) {

				if ( target.closest('.export') !== hoveredExport ) {

					removeClass(hoveredExport.parentElement, 'export', 'activeLarge');
					addClass(hoveredExport.parentElement, 'export', 'activeSmall');

					addClass(currentLine, 'export', 'activeLarge');
					removeClass(currentLine, 'export', 'activeSmall');

					hoveredImport = target.closest('.export');
				};

			} else {
				removeClass(hoveredExport.parentElement, 'export', 'activeLarge');
				addClass(hoveredExport.parentElement, 'export', 'activeSmall');
				addClass(currentLine, 'export', 'activeSmall');
				hoveredExport = null;
			};

		} else {

			if ( target.closest('.export') ) {
				removeClass(currentLine, 'export', 'activeSmall');
				addClass(currentLine, 'export', 'activeLarge');
				hoveredExport = target.closest('.export');
			};

		};

	} else {

		if ( !hoveredCountry ) {

			if ( target.closest('.country') ) {

				addClass(currentLine, 'country', 'hovered');
				hoveredCountry = target.closest('.country');

				addClass(currentLine, 'import', 'hoveredSmall');
				hoveredImport = currentLine.getElementsByClassName('import')[0];

				addClass(currentLine, 'export', 'hoveredSmall');
				hoveredExport = currentLine.getElementsByClassName('export')[0];

			};

			if (hoveredImport) {

				if (target.closest('.import') !== hoveredImport) {

					if ( hoveredImport.parentElement.classList.contains('active') ) {

						removeClass (hoveredImport.parentElement, "import", 'activeLarge');
						addClass(hoveredImport.parentElement, 'import', 'activeSmall');

					} else {

						removeClass (hoveredImport.parentElement, "import", 'hoveredLarge');
						addClass(hoveredImport.parentElement, 'import', 'hoveredSmall');

					};

					hoveredImport = null;
				};

			} else {

				if ( target.closest('.import') ) {
					addClass(currentLine, 'import', 'hoveredLarge');
					removeClass (currentLine, "import", 'hoveredSmall');
					hoveredImport = target.closest('.import');
				};

			};

			if (hoveredExport) {

				if ( target.closest('.export') !== hoveredExport ) {

					if ( hoveredExport.parentElement.classList.contains('active') ) {

						removeClass (hoveredExport.parentElement, "export", 'activeLarge');
						addClass(hoveredExport.parentElement, 'export', 'activeSmall');

					} else {

						removeClass (hoveredExport.parentElement, "export", 'hoveredLarge');
						addClass(hoveredExport.parentElement, 'export', 'hoveredSmall');

					};

					hoveredExport = null;

				};

			} else {

				if ( target.closest('.export') ) {
					addClass(currentLine, 'export', 'hoveredLarge');
					removeClass (currentLine, "export", 'hoveredSmall');
					hoveredExport = target.closest('.export');
				};

			};

		} else {

			if (currentLine !== hoveredCountry.parentElement || (
					!target.closest('.import') &&
					!target.closest('.export') &&
					!target.closest('.country')
				)){
				clearHoveredLine();
				return;
			};

			if (hoveredImport) {

				if (target.closest('.import') !== hoveredImport) {

					if ( hoveredImport.parentElement.classList.contains('active') ) {

						removeClass (hoveredImport.parentElement, "import", 'activeLarge');
						addClass(hoveredImport.parentElement, 'import', 'activeSmall');

					} else {

						removeClass (hoveredImport.parentElement, "import", 'hoveredLarge');
						addClass(hoveredImport.parentElement, 'import', 'hoveredSmall');

					};

					hoveredImport = null;
				};

			} else {

				if ( target.closest('.import') ) {
					addClass(currentLine, 'import', 'hoveredLarge');
					removeClass (currentLine, "import", 'hoveredSmall');
					hoveredImport = target.closest('.import');
				};

			};

			if (hoveredExport) {

				if (target.closest('.export') !== hoveredExport) {

					if ( hoveredExport.parentElement.classList.contains('active') ) {

						removeClass (hoveredExport.parentElement, "export", 'activeLarge');
						addClass(hoveredExport.parentElement, 'export', 'activeSmall');

					} else {

						removeClass (hoveredExport.parentElement, "export", 'hoveredLarge');
						addClass(hoveredExport.parentElement, 'export', 'hoveredSmall');

					};

					hoveredExport = null;
				};

			} else {

				if ( target.closest('.export') ) {
					addClass(currentLine, 'export', 'hoveredLarge');
					removeClass (currentLine, "export", 'hoveredSmall');
					hoveredExport = target.closest('.export');
				};

			};

		};

	};

};

activateScene (content.getElementsByClassName('line')[0], 'import');

var main = document.getElementById('main');
// main.style.width = document.documentElement.clientWidth + "px";
main.style.height = (document.documentElement.clientHeight-60) + "px";

function addClass (currentLine, classFind, classAdd) {
	var obj = currentLine.getElementsByClassName(classFind)[0];
	if ( obj.classList.contains(classAdd) ) { return };
	obj.classList.add(classAdd);
};

function removeClass (currentLine, classFind, classRemove) {
	var obj = currentLine.getElementsByClassName(classFind)[0];
	obj.classList.remove(classRemove);
};

function clearHoveredLine () {

	if (hoveredCountry) {
		removeClass (hoveredCountry.parentElement, "country", 'hovered');
		removeClass (hoveredCountry.parentElement, "import", 'hoveredSmall');
		removeClass (hoveredCountry.parentElement, "import", 'hoveredLarge');
		removeClass (hoveredCountry.parentElement, "export", 'hoveredSmall');
		removeClass (hoveredCountry.parentElement, "export", 'hoveredLarge');
		hoveredCountry = null;
		hoveredImport = null;
		hoveredExport = null;
	};

	if (hoveredImport) {
		if ( hoveredImport.parentElement.classList.contains('active') ) {
			addClass (hoveredImport.parentElement, "import", 'activeSmall');			removeClass (hoveredImport.parentElement, "import", 'activeLarge');

		} else {
			removeClass (hoveredImport.parentElement, "import", 'hoveredSmall');
			removeClass (hoveredImport.parentElement, "import", 'hoveredLarge');
		};
		hoveredImport = null;
	};

	if (hoveredExport) {

		if ( hoveredExport.parentElement.classList.contains('active') ) {
			removeClass (hoveredExport.parentElement, "export", 'activeLarge');
			addClass (hoveredExport.parentElement, "export", 'activeSmall');
		} else {
			removeClass (hoveredExport.parentElement, "export", 'hoveredSmall');
			removeClass (hoveredExport.parentElement, "export", 'hoveredLarge');
		};		
		hoveredExport = null;
	};

};

function onMouseClick (e) {

	var parentLine = e.target.closest('.line');

	if ( e.target.closest('.import') ) {
		activateScene(parentLine, 'import');
	} else if ( e.target.closest('.export') ) {
		activateScene(parentLine, 'export');
	};

};

function activateScene (currentLine, scenario) {

	var country = currentLine.classList[1],
			storage,
			importDiv = currentLine.getElementsByClassName('import')[0],
			exportDiv = currentLine.getElementsByClassName('export')[0];

	 clearHoveredLine();

	if (scenario === 'import') {
		storage = 'importData';
		currentLine.style.background = '#6987a4';
	} else if (scenario === 'export') {
		storage = 'exportData';
		currentLine.style.background = '#6cadd9';
	};

	importDiv.classList.add('activeSmall');
	exportDiv.classList.add('activeSmall');
	currentLine.classList.add('active');

	var week = data[country][storage].week;
	var weekElement = currentLine.getElementsByClassName('week')[0];
	var weekDays = weekElement.getElementsByClassName('week_day');
	weekElement.style.display = 'block';

	for (var i=weekDays.length;i--;i) {
		var currentDay = weekDays[i];
		currentDay.classList.remove('active');
	};

	for (var i=week.length;i--;i) {
		var currentDay = weekElement.getElementsByClassName(week[i])[0];
		currentDay.classList.add('active');
	};

	var transit = currentLine.getElementsByClassName('transit')[0];
	transit.getElementsByTagName('span')[0].textContent = data[country][storage]['transit'];

};

function onMouseLeave (e) {

	if ( !content.contains(e.relatedTarget) ) {
		clearHoveredLine();
	};

};

function createCountryLine (country, key) {

	var lineClone = line.cloneNode(true);
	lineClone.classList.add(key);

	var divCountry = lineClone.getElementsByClassName('country')[0];
	var spanCountry = divCountry.getElementsByTagName('span')[0];
	spanCountry.textContent = country.name;

	content.appendChild(lineClone);
};

})();
