const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("pls enter a city");
  }
});
function displayError(message) {
  const erroeDisplay = document.createElement("p");
  erroeDisplay.textContent = message;
  erroeDisplay.classList.add("erroeDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(erroeDisplay);
}
async function getWeatherData(city) {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not find weather data");
  }
  return await response.json();
}
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { humidity, temp },
    weather: [{ id, description }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}
function getWeatherEmoji(id) {
  switch (true) {
    case id >= 200 && id < 300:
      return "⚡";
    case id >= 300 && id < 400:
      return "🌦️";
    case id >= 500 && id < 600:
      return "🌨️";
    case id >= 600 && id < 700:
      return "❄️";
    case id >= 700 && id < 800:
      return "🌫️";
    case id === 800:
      return "☀️";
    case id >= 801 && id < 810:
      return "☁️";
    default:
      return "❓";
  }
}
