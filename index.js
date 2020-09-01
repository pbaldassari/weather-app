//Current Locaiton
function displayPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "74b46494188e9abc362ff59069b258f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
let currentLocationsButton = document.querySelector("#current-button");
currentLocationsButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let days = weekDay[date.getDay()];
  let numberDay = date.getDate();
  let currentTime = date.toLocaleTimeString([], {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${days}, ${month} ${numberDay}  |  ${currentTime}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);

  let currentTime = date.toLocaleTimeString([], {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${currentTime}`;
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let currentCity = response.data.name;
  let description = response.data.weather[0].description;

  fahrenheitTemp = response.data.main.temp;

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}°F`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `WIND: ${windSpeed} KM/H`;

  let humid = document.querySelector("#humidity");
  humid.innerHTML = `HUMIDITY: ${humidity}%`;

  let currentLocation = document.querySelector("h1");
  currentLocation.innerHTML = `${currentCity.toUpperCase()}`;

  let weatherType = document.querySelector("#description");
  weatherType.innerHTML = `${description.toUpperCase()}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function displayForecast(response) {
  let forecastPanel = document.querySelector("#weather-forecast");
  forecastPanel.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];

    forecastPanel.innerHTML += `
    <div class="col-lg-2">
                <h2>${formatHours(forecast.dt * 1000)}</h2>
                <img
                  src= "http://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png"
                  
                  />
                
                <p class="card-text">${Math.round(
                  forecast.main.temp_max
                )}°<span class="night">/ ${Math.round(
      forecast.main.temp_min
    )}°</span></p>
              </div>`;
  }
}

function search(city) {
  let apiKey = "74b46494188e9abc362ff59069b258f0";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("h3");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  degreesElement.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("h3");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  degreesElement.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}
let fahrenheitTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Los Angeles");
