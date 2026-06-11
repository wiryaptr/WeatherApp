const API_KEY = 'YOUR_API_KEY';

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

const cityName = document.getElementById('city-name');
const weatherCondition = document.getElementById('weather-condition');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const weatherInfo = document.querySelector('.weather-info');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const weatherIcon = document.getElementById('weather-icon');
const feelsLike = document.getElementById('feels-like');

weatherInfo.style.display = 'none';

function displayWeather(data) {
        weatherInfo.style.display = 'block';

        cityName.textContent = data.name;

        weatherCondition.textContent = data.weather[0].description;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        feelsLike.textContent =`Feels like ${Math.round(data.main.feels_like)}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        
    }   
    

    
async function fetchWeatherData(city) {
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if(data.cod !== 200){
            hideLoading();
            showError('City not found');
            return;
        }

        hideLoading();
        displayWeather(data);
        cityInput.value = '';
        console.log(data);
    }catch(error){
        hideLoading();
        showError('An error occurred while fetching data');
        console.error(error);
    }
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if(city === ''){
        showError('Please enter a city name');
        return;
    }

    showLoading();
    fetchWeatherData(city);
});

cityInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        searchButton.click();
    }
});

function showLoading(){
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'none';
    loadingMessage.style.display = 'block';
    searchButton.disabled = true;
}

function hideLoading(){
    loadingMessage.style.display = 'none';
    searchButton.disabled = false;
}

function showError(message){
    weatherInfo.style.display = 'none';
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
}

