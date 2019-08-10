// Добавить возможность выбирать чекбосы для типа поиска
// Визуальное подтверждение загрузки скрипта

// Иконки выпадающего списка

// Задержка при загрузке страницы
var search = document.getElementsByClassName('adressInput')[0];
var currentAdressList;
var extraKindArr = ['district'];

function inputSearchChange (e) {
  console.log("Change in the Search input");
  ymapsSend(search.value, {json: true}, ajaxSuccess);
};

function ymapsSend(coordinates, options, callBackSuccess, callbackError) {

  var myGeocoder = ymaps.geocode(coordinates, options)
  .then(function (res) {
    console.log("Successful ajax request");
    callBackSuccess(res.GeoObjectCollection.featureMember);
  }, function (err) {
    console.log("Error ajax request");
    showSamples(false);
  });

};

function ajaxSuccess (geoData) {

  console.log("Trying to change current samples");
  var sampleList = showSamples(geoData);

  document.addEventListener('click', sampleListClick); // Rename

  function sampleListClick (e) {
    // Function is inside because of access to [geoData]
    console.log("Click");

    if ( e.target.classList.contains('sampleItem') ) {
      var position = e.target.getAttribute('position');
      setComponents ( geoData[position] );
    };

    document.removeEventListener('click', sampleListClick);
    showSamples(false);
  };

};

function setComponents ( currentAdress ) {

  search.value = currentAdress['GeoObject']['name'];

  console.log(search.value = currentAdress['GeoObject']['name']);

  var components = currentAdress['GeoObject']['metaDataProperty']['GeocoderMetaData']['Address']['Components'];

  // Не уверен почему координаты в обратном порядке
  var pos = currentAdress['GeoObject']['metaDataProperty']['GeocoderMetaData']['InternalToponymInfo']['Point']['coordinates'];
  pos = pos[1]+" "+pos[0];

  getExtraKinds(components, pos);

};

function replaceResults (components, pos) {

  console.log(components, pos);

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

    console.log(kindValue);

    if (!kindValue) {
      replaceResults(components, pos);
    };

    var options = {
      json: true,
      kind: kindValue
    };

    console.log("Making ymaps request",options);

    ymapsSend(pos, options, addComponents);

  };

  function addComponents (geoData) {

    console.log("Answer", geoData);

    geoData.forEach(getGeoPoint);

    console.log("Can i see it");

    if (--extraKindsCounter) {
      console.log(extraKindsCounter, !!extraKindsCounter);
      loadExtraKind ( extraKindArr[extraKindsCounter-1] );
    } else {
      console.log(extraKindsCounter, !!extraKindsCounter);
      replaceResults(components, pos);
    };

  };

  function getGeoPoint(geoPoint) {

    var name = geoPoint['GeoObject']['name'];

    console.log(geoPoint, name);

    for (var i = components.length; i--;) {

      console.log(components[i]['kind'], extraKindArr[extraKindsCounter-1]);
      if ( components[i]['kind'] == extraKindArr[extraKindsCounter-1] ){

        console.log(components[i]['kind'], "extra");
        components[i]['extra'] = true }; // remove extra

      if ( components[i]['kind'] == extraKindArr[extraKindsCounter-1] && components[i]['name'] == name ) {
        name = false
      };

    };

    console.log(components, name, !!name);

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
  var sampleList = document.createElement('div');
  sampleList.id = "sampleList";

  for (var a = geoData.length; a--;) {
    var sampleItem = document.createElement('div');
    sampleItem.classList.add('sampleItem');
    sampleItem.setAttribute('position', a);
    sampleItem.append( document.createTextNode( geoData[a]['GeoObject']['name'] ));
    sampleList.append(sampleItem);
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
  script.src = "https://api-maps.yandex.ru/2.1?apikey="+yandexKeyInput.value+"&lang=ru_RU";
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
