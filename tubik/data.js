var data = {
	GBR: {
		name: "United Kingdom",
		importData: {
			transit: "1 / 2 days",
			week: ["mon", "tue", "wed", "thu", "fri"]
		},
		exportData: {
			transit: "1 / 2 days",
			week: ["mon", "tue", "wed", "thu", "fri"]
		}
	},
	BEL: {
		name: "Belgium",
		importData: {
			transit: "2 - 3 days",
			week: ["mon", "tue", "wed", "fri"]
		},
		exportData: {
			transit: "2 - 3 days",
			week: ["mon", "tue", "wed", "fri"]
		}
	},
	CZE: {
		name: "Czech",
		importData: {
			transit: "4+ days",
			week: ["tue", "fri"]
		},
		exportData: {
			transit: "4+ days",
			week: ["tue", "fri"]
		}
	},
	FRA: {
		name: "France",
		importData: {
			transit: "2 - 3 days",
			week: ["wed", "fri"]
		},
		exportData: {
			transit: "2 - 3 days",
			week: ["tue", "fri"]
		}
	},
	DEU: {
		name: "Germany",
		importData: {
			transit: "2 - 3 days",
			week: ["tue", "wed", "fri"]
		},
		exportData: {
			transit: "2 - 3 days",
			week: ["tue", "fri"]
		}
	},
	NLD: {
		name: "Netherlands",
		importData: {
			transit: "2 - 3 days",
			week: ["mon", "tue", "wed", "fri"]
		},
		exportData: {
			transit: "2 - 3 days",
			week: ["mon", "tue", "wed", "fri"]
		}
	},
	HUN: {
		name: "Hungary",
		importData: {
			transit: "4+ days",
			week: ["tue", "fri"]
		},
		exportData: {
			transit: "4+ days",
			week: ["tue", "fri"]
		}
	},
	ITA: {
		name: "Italy",
		importData: {
			transit: "3 days",
			week: ["tue", "fri"]
		},
		exportData: {
			transit: "3 days",
			week: ["tue", "fri"]
		}
	},
	POL: {
		name: "Poland",
		importData: {
			transit: "4+ days",
			week: ["tue", "fri"]
		},
		exportData: {
			transit: "4+ days",
			week: ["tue", "fri"]
		}
	},
	PRT: {
		name: "Portugal",
		importData: {
			transit: "3 - 4 days",
			week: ["fri"]
		},
		exportData: {
			transit: "3 - 4 days",
			week: ["fri"]
		}
	},
	ESP: {
		name: "Spain",
		importData: {
			transit: "3 - 4 days",
			week: ["fri"]
		},
		exportData: {
			transit: "3 - 4 days",
			week: ["fri"]
		}
	},
	TUR: {
		name: "Turkey",
		importData: {
			transit: "10 - 12 days",
			week: ["tue", "fri"]
		},
		exportData: {
			transit: "10 - 12 days",
			week: ["tue", "fri"]
		}
	}
};

var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
xhr.open('GET', 'https://geocode-maps.yandex.ru/1.x?geocode=moscow&apikey=261b2f2a-4da8-44ad-aed0-c2793300a241', false);

// xhr.setRequestHeader(
//   "Content-Type",
//   "multipart/form-data"
// );

// xhr.setRequestHeader(
//   "Access-Control-Allow-Origin",
//   "Yandex Maps Key"
// );

xhr.setRequestHeader(
  "Access-Control-Allow-Headers",
  "https://greezlu.github.io"
);

xhr.setRequestHeader(
  "Origin",
  "https://greezlu.github.io"
);

// 3. Отсылаем запрос
xhr.send();

// 4. Если код ответа сервера не 200, то это ошибка
if (xhr.status != 200) {
  // обработать ошибку
  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
  // вывести результат
  console.log( xhr.responseText ); // responseText -- текст ответа.
};
