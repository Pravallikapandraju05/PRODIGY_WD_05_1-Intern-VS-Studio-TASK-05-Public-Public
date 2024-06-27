// script.js
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

document.getElementById('searchButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(location);
});

document.getElementById('currentLocationButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherDataByCoords(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherDataByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    if (data.cod === '404') {
        alert('Location not found');
        return;
    }

    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p class="weather-info">Temperature: ${data.main.temp} °C</p>
        <p class="weather-info">Weather: ${data.weather[0].description}</p>
        <p class="weather-info">Humidity: ${data.main.humidity} %</p>
        <p class="weather-info">Wind Speed: ${data.wind.speed} m/s</p>
        <p class="weather-info">Visibility: ${data.visibility / 1000} km</p>
        <p class="weather-info">Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p class="weather-info">Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    `;
}
