const elements = {
  form: document.querySelector(".js-search-form"),
  list: document.querySelector(".js-list"),
};

elements.form.addEventListener("submit", handlerForecast);

function handlerForecast(evt) {
  evt.preventDefault();

  const { city, days } = evt.currentTarget.elements;

  serviceWeather(city.value, days.value)
    .then((data) => {
      elements.list.innerHTML = createMarkup(
        data.forecast.forecastday,
        data.location
      );
    })
    .catch((err) => {
      elements.list.innerHTML =
        '<li class="weather-card"><img src="https://repository-images.githubusercontent.com/627560142/41fad3ef-09ac-4e99-a6b7-bacf592b3142" alt="weather" width="500"/></li>';
      console.log(err);
    });
}

function serviceWeather(city = "", days = "0") {
  const BASE_URL = "http://api.weatherapi.com/v1"; 
  const END_POINT = "/forecast.json";
  const API_KEY = "6410346f89264d6e919165208231505";

  const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    days: days,
    lang: "en",
  });

  return fetch(`${BASE_URL}${END_POINT}?${params}`).then((resp) => {
    console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function createMarkup(arr, location) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { icon, text },
        },
      }) => `
  <li class="weather-card">
    <img src="${icon}" alt="${text}" class="weather-icon" />
    <h2 class="date">${location.name}</h2>
    <h3 class="date">${location.country}</h3>
    <h4 class="date">${date}</h4>
    <h4 class="weather-text">${text}</h4>
    <h4 class="temperature">${avgtemp_c} °C</h4>
</li>`
    )
    .join("");
}