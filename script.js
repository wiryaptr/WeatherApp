const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const cityName = document.getElementById('city-name');
const weatherCondition = document.getElementById('weather-condition');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

searchButton.addEventListener('click', () => {
    
    if(cityInput.value.trim() === ''){
        console.log('Enter a city name');
        return;
    }

    console.log(cityInput.value);
    cityName.textContent = cityInput.value;
    weatherCondition.textContent = 'Sunny';
    temperature.textContent = '25°C';
    humidity.textContent = '60%';
    windSpeed.textContent = '10 km/h';
});


