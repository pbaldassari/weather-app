//Feature 1
let currentDate = new Date();

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

let newTime = document.querySelector("#time");
let currentTime = currentDate.toLocaleTimeString([], {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
});
let date = currentDate.getDate();
let month = months[currentDate.getMonth()];
let currentDay = weekDay[currentDate.getDay()];

newTime.innerHTML = `${currentDay}, ${month} ${date}  | ${currentTime}`;

//Search Bar
function citySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#name-city");
  let cityInput = document.querySelector("#city-input");

  cityName.innerHTML = cityInput.value.toUpperCase();
}

let searchForm = document.querySelector("#form-input");
searchForm.addEventListener("submit", citySearch);

//Farenheit and Celsius
function cTemp() {
  let currentCTemp = document.querySelector(".degrees");
  currentCTemp.innerHTML = "10°C";
}
let showCTemp = document.querySelector("#celsius-link");
showCTemp.addEventListener("click", cTemp);

function fTemp() {
  let currentFTemp = document.querySelector(".degrees");
  currentFTemp.innerHTML = "50°F";
}
let showFTemp = document.querySelector("#fahrenheit-link");
showFTemp.addEventListener("click", fTemp);

/// Week 5 Homework
function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let currentCity = response.data.name;
  let description = response.data.weather[0].description;

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}°F`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `WIND: ${windSpeed} KM/H`;

  let humid = document.querySelector("#humidity");
  humid.innerHTML = `HUMIDITY: ${humidity}%`;

  let currentLocation = document.querySelector("h1");
  currentLocation.innerHTML = `${currentCity.toUpperCase()}`;

  let weatherType = document.querySelector("#weather");
  weatherType.innerHTML = `${description.toUpperCase()}`;
}

//let currentLocationButton = document.querySelector("#current-button");
//currentLocationButton.addEventListener("click", showWeather);

function searchCity(city) {
  let apiKey = "74b46494188e9abc362ff59069b258f0";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let searchCityName = document.querySelector("#city-input").value;
  searchCity(searchCityName);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

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

let form = document.querySelector("#form-input");
form.addEventListener("submit", search);
