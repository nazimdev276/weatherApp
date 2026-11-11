// get the css classes from the DOM
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// main function
// make th button responsive
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      // catch network errors or similar
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

// in case the main function got cut off due network or type conversion essues
// display Error as HTML in the DOM
function displayError(message) {
  const erroeDisplay = document.createElement("p");
  erroeDisplay.textContent = message;
  erroeDisplay.classList.add("erroeDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(erroeDisplay);
}

// retreiving weather data from the api in json format
async function getWeatherData(city) {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // add via config.js
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not find weather data");
  }
  return await response.json();
}

// show retreived data in the DOM
function displayWeatherInfo(data) {
  // extract the fields from the json response
  const {
    name: city,
    main: { humidity, temp },
    weather: [{ id, description }],
  } = data;
  // reset the content of the card
  card.textContent = "";
  card.style.display = "flex";
  //create the tags as placeholders for now
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");
  // set the text in the tags to match the data from the api
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);
  // add relevant css classes for dynamic styling
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");
  // add the elements to the DOM
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

// set Emoji based on the weather Id from the api call
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
