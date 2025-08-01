const apiKey = "55290e1290f476ba246847439cb03119";

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const stateInput = document.getElementById("stateInput");
const weatherResult = document.getElementById("weatherResult");
const locationName = document.getElementById("locationName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  const state = stateInput.value.trim().toUpperCase();
  const query = state ? `${city},${state},US` : `${city},US`;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial`
    );

    if (!res.ok) throw new Error("City not found or incorrect input.");

    const data = await res.json();

    locationName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `🌡 Temperature: ${data.main.temp}°F`;
    description.textContent = `🌥 Weather: ${data.weather[0].description}`;
    humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;

    weatherResult.classList.remove("hidden");
  } catch (error) {
    locationName.textContent = "❌ Error: " + error.message;
    temperature.textContent = "";
    description.textContent = "";
    humidity.textContent = "";
    weatherResult.classList.remove("hidden");
  }
});

