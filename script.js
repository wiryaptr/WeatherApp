const API_KEY = 'xxxxxxxx';

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

weatherInfo.style.display = 'none';

function displayWeather(data) {
        weatherInfo.style.display = 'block';

        cityName.textContent = data.name;

        weatherCondition.textContent = data.weather[0].main;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} m/s`;
    }   
    
async function fetchWeatherData(city) {
    try{
        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        if(data.cod !== 200){
            loadingMessage.style.display = 'none';
            weatherInfo.style.display = 'none';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'City not found';
            return;
        }

        loadingMessage.style.display = 'none';
        displayWeather(data);
    }catch(error){
        loadingMessage.style.display = 'none';
        weatherInfo.style.display = 'none';

        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Something went wrong';

        console.error(error);
    }
    console.log(data);   
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if(city === ''){
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please enter a city name';
        weatherInfo.style.display = 'none';
        loadingMessage.style.display = 'none';
        return;
    }

    weatherInfo.style.display = 'none';
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';

    fetchWeatherData(city);
});

cityInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        searchButton.click();
    }
});
