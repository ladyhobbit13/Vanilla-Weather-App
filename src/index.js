// date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentYear = now.getFullYear();
let currentMonth = months[now.getMonth()];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
let currentTime = `${currentHour}:${currentMinute}`;
let today = document.querySelector("#today-date");
today.innerHTML = `${formattedDate}`;
let time = document.querySelector("#today-time");
time.innerHTML = `${currentTime}`;

// current location

function showPosition(position) {
  let apiKey = "1311cf318d3edfa90a5746a7bee262dc";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = `${response.data.name}`;
  let nowTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `Temperature: ${nowTemp}`;
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let cityWindSpeed = document.querySelector("#wind");
  cityWindSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} mph`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  fahrenheitCity = response.data.main.temp;
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
  fahrenheitCity = response.data.main.temp;
}

let button = document.querySelector("#current-city");
button.addEventListener("click", getCurrentPosition);

// temp switch

function celsius(event) {
  event.preventDefault();
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  let celsiusCity = ((fahrenheitCity - 32) * 5) / 9;
  temperature.innerHTML = `Temperature: ${Math.round(celsiusCity)}`;
}
function fahrenheit(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  temperature.innerHTML = `Temperature: ${Math.round(fahrenheitCity)}`;
}

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", celsius);
let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", fahrenheit);
let temperature = document.querySelector("#temperature");

let fahrenheitCity = null;

// search engine

function citySearch(event) {
  event.preventDefault();
  let apiKey = "1311cf318d3edfa90a5746a7bee262dc";
  let city = document.querySelector("#city-name");
  let searchInput = document.querySelector("#city-search");
  city.innerHTML = `${searchInput.value}`;
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = `${temperature}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", citySearch);
