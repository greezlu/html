
var ymapsMap = document.getElementsByClassName('ymapsMap')[0];
var multiRoute;

// ymaps.ready(init);

function mapInitiate () {
  console.log(arguments);

  ymapsMap = new ymaps.Map(ymapsMap, {
                  center: [55.76, 37.64],
                  zoom: 10,
                  controls: ['zoomControl']
              });

  factoryList.forEach(addFactoriesPlacemark);

}

function addFactoriesPlacemark(item) {

  var placemark = new ymaps.Placemark(item['coords'], {
    balloonContent: item['adressList'][0],
    iconCaption: item['name']
  }, {
    preset: "islands#blueFactoryCircleIcon",
    // Отключаем кнопку закрытия балуна.
    balloonCloseButton: false
});

ymapsMap.geoObjects.add(placemark);

};


//----------------------------------------------------// Map Script ^

// Визуальное подтверждение загрузки скрипта

// Иконки выпадающего списка

// Задержка при загрузке страницы
var search = document.getElementsByClassName('adressInput')[0];

var adressList;

var currentAdress;

function inputSearchChange (e) {
  ymapsSend(search.value, {json: true}, geocodeSuccess);
};

function ymapsSend(coordinates, options, callbackSuccess, callbackError) {

  var myGeocoder = ymaps.geocode(coordinates, options)
  .then(function (res) {
    callbackSuccess(res);
  }, function (err) {
    showSamples(false); // doublecheck - looks sily
  });

};

function geocodeSuccess (geoData) {
  var geoDataCollection = geoData.GeoObjectCollection.featureMember;
  showSamples(geoDataCollection);
  // this^ function should work in different way (100 results + searc)

  document.addEventListener('click', sampleListClick); // Rename
};

function sampleListClick (e) {

  if ( e.target.classList.contains('sampleItem') ) {
    var x = e.target.getAttribute('x');
    var y = e.target.getAttribute('y');
    search.value = e.target.textContent;
    setExamples (x, y); // Rename - it does another work
  };

  document.removeEventListener('click', sampleListClick);
  showSamples(false);

};


function setExamples ( x, y ) {
  //       should be ( coords, {options} )

  // var adress = getReverseGeocode(coords);
  getNearFactory(x, y);

  // var components = currentAdress['GeoObject']['metaDataProperty']['GeocoderMetaData']['Address']['Components'];

  // Не уверен почему координаты в обратном порядке
  // var pos = currentAdress['GeoObject']['metaDataProperty']['GeocoderMetaData']['InternalToponymInfo']['Point']['coordinates'];
  // pos = pos[1]+" "+pos[0];

  // getExtraKinds(components, pos);

  function loadExtraKind (kindValue) {

    if (!kindValue) {
      replaceResults(components, pos);
    };

    var options = {
      json: true,
      kind: kindValue
    };

    ymapsSend(pos, options, addComponents);

  };

};

function getNearFactory (x,y) {
  // (adressCoords)


  // console.log(coords, factoryList[0]['coords']);
  //
  // console.log(ymaps.coordSystem.geo.getDistance(coords, +" "+ );

var min = Infinity;
var factoryClose;

  for (var i = factoryList.length; i--;) {
    var factoryCoords = factoryList[i]['coords'];
    var currentDistance = ymaps.coordSystem.geo.getDistance([y,x],factoryCoords);

    if (currentDistance<min){
      min = currentDistance;
      factoryClose = factoryList[i];
    }

  };



//   var placemark = new ymaps.Placemark([y,x], {
//     // balloonContent: factoryClose['adressList'][0],
//     // iconCaption: factoryClose['name']
//   }, {
//     preset: "islands#greenHomeIcon",
//     // Отключаем кнопку закрытия балуна.
//     balloonCloseButton: false
// });


multiRoute = new ymaps.multiRouter.MultiRoute({
        // Описание опорных точек мультимаршрута.
        referencePoints: [
            factoryClose['coords'],
            [y,x]
        ],
        // Параметры маршрутизации.
        params: {
            // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
            results: 1
        }
    }, {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true
    });

    ymapsMap.geoObjects.add(multiRoute);

    multiRoute.model.events.add("requestsuccess", function (event) {
        var route = event.get("target").getRoutes();
        //-------------------------------------------------
        var a = document.createElement('div')
        a.textContent = "Длина маршрута " + route[0].properties.get("distance").text;
        var resultContainer = document.getElementById('resultContainer').append(a);
        //-------------------------------------------------
        console.log("Длина маршрута " + route[0].properties.get("distance").text);
    });

    // ymapsMap.geoObjects.add(placemark)

}

function replaceResults (components, pos) {

  var resultContainer = document.getElementById('resultContainer');
  var newContainer = document.createElement('div');
  newContainer.id = 'resultContainer';

  // Find Position
  newContainer.append(
    createKindItem ("position", pos)
  );

  for (var i = components.length; i--;) {

    var kind = components[i]['kind'];
    var name = components[i]['name'];

    var responseData = createKindItem (kind, name);
    newContainer.prepend(responseData);

    if (components[i]['extra']) { responseData.classList.add('green') };

  };

  resultContainer.replaceWith(newContainer);

};

function getExtraKinds (components, pos) {

  var extraKindsCounter = extraKindArr.length;
  var extraKind = extraKindArr[extraKindsCounter-1];
  loadExtraKind( extraKind );

  function loadExtraKind (kindValue) {

    if (!kindValue) {
      replaceResults(components, pos);
    };

    var options = {
      json: true,
      kind: kindValue
    };

    ymapsSend(pos, options, addComponents);

  };

  function addComponents (geoData) {

    geoData.forEach(getGeoPoint);

    if (--extraKindsCounter) {
      loadExtraKind ( extraKindArr[extraKindsCounter-1] );
    } else {
      replaceResults(components, pos);
    };

  };

  function getGeoPoint(geoPoint) {

    var name = geoPoint['GeoObject']['name'];

    for (var i = components.length; i--;) {
      if ( components[i]['kind'] == extraKindArr[extraKindsCounter-1] ){
        components[i]['extra'] = true };
      if ( components[i]['kind'] == extraKindArr[extraKindsCounter-1] && components[i]['name'] == name ) {
        name = false
      };

    };

    if (name) {
      components.push({kind: extraKindArr[extraKindsCounter-1], name: name, extra: true})
    };


  };

};

function createKindItem (kind, name) {

  var div = document.createElement('div');
  div.classList.add('responseData');
  var span = document.createElement('span');
  span.textContent = kind+": ";
  span.classList.add('responseKindItem');
  div.append(span);
  span = document.createElement('span');
  span.textContent = name;
  span.classList.add('responseValueItem');
  div.append(span);

  return div;

};

function showSamples (geoData) {
  console.log(geoData);
  var sampleList = document.createElement('div');
  sampleList.id = "sampleList";

  for (var a = geoData.length; a--;) {
    var sampleItem = document.createElement('div');
    sampleItem.classList.add('sampleItem');
    // sampleItem.setAttribute('coords', geoData[a]['GeoObject']['Point']['pos']);

    sampleItem.setAttribute('x', geoData[a]['GeoObject']['metaDataProperty']['GeocoderMetaData']['InternalToponymInfo']['Point']['coordinates'][0]);
    sampleItem.setAttribute('y', geoData[a]['GeoObject']['metaDataProperty']['GeocoderMetaData']['InternalToponymInfo']['Point']['coordinates'][1]);
    sampleItem.prepend( document.createTextNode( geoData[a]['GeoObject']['metaDataProperty']['GeocoderMetaData']['text'] ));
    sampleList.prepend(sampleItem);
  };

  return document.getElementById("sampleList").replaceWith(sampleList);
};



//----------------------------------------------------// Search Script ^

var script;
var yandexKeyInput = document.getElementsByClassName('yandexKeyInput')[0];
yandexKeyInput.addEventListener ('change', inputKeyChange);


// Добавить возможность удалить script пустым полем ввода или кнопкой
// Добавить работу с cookie и запоминать последний рабочий key
// Отследить нажатие Enter и добавить на него обработчик onBlur

function inputKeyChange (e) {

  yandexKeyInput.removeEventListener('change', inputKeyChange);
  script = document.createElement('script');
  script.src = "https://api-maps.yandex.ru/2.1?apikey="+yandexKeyInput.value+"&lang=ru_RU&onload=mapInitiate";
  script.addEventListener ('error', scriptError);
  script.addEventListener ('load', scriptLoad);

  document.head.append(script);
};

function scriptError (e) {
  document.head.removeChild(script);
  yandexKeyInput.value="";

  yandexKeyInput.addEventListener ('change', inputKeyChange);
};

function scriptLoad (e) {
  yandexKeyInput.disabled = true;
  yandexKeyInput.classList.add('green');
  search.addEventListener ('change', inputSearchChange);
  search.disabled = false;
  search.placeholder = "Enter your adress here";
};
