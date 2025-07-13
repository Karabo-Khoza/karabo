function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temp = response.data.temperature.current;
  let cityElememnt = document.querySelector("#city");
  let descriptionElememnt = document.querySelector("#description");
  let humidityElememnt = document.querySelector("#humidity");
  let windSpeedElememnt = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  temperatureElement.innerHTML = Math.round(temp);
  descriptionElememnt.innerHTML = response.data.condition.description;
  humidityElememnt.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElememnt.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  cityElememnt.innerHTML = response.data.city;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "abcf5d3b0bd02t169o09a45ab84f1629";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
