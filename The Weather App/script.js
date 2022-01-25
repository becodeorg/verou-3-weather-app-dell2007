import Data from './config.js';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('submitButton');
const todayForecast = document.getElementById('todayForecast');
const forecast = document.getElementById('forecast');

//Event to search by enter or click button
searchButton.addEventListener('click', search);
window.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
    let cityName = searchBar.value.toLowerCase();

    //API link to search by city name
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=' + Data.key)
        .then(response => response.json())
        .then(result => {
            //Latitude & longitude for the second API
            const lat = result.city.coord.lat;
            const lon = result.city.coord.lon;

            //City and country fetch from first API
            const city = document.createElement('h3');
            city.setAttribute('id', 'city');
            city.innerHTML = result.city.name + ', ' + result.city.country;

            //API link to forecast by date
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,alert&units=metric&appid=' + Data.key)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    //Today forecast information
                    const actualTime = document.createElement('p');
                    actualTime.setAttribute('id', 'timeNow');
                    actualTime.innerHTML = new Date(data.daily[0].dt * 1000).toDateString();
                    todayForecast.appendChild(actualTime);
                    todayForecast.appendChild(city);
                    const actualTemp = document.createElement('h3');
                    actualTemp.innerHTML = Math.round(data.current.temp) + '°C';
                    todayForecast.appendChild(actualTemp);
                    const actualIcon = document.createElement('img');
                    actualIcon.src = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';
                    actualTemp.appendChild(actualIcon);

                    //Loop forecast following 5 days
                    for (let i = 0; i < 5; i++) {
                        const icon = document.createElement('img');
                        icon.src = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png';
                        forecast.appendChild(icon);
                        const differentDay = document.createElement('p');
                        differentDay.innerHTML = new Date(data.daily[i].dt * 1000).toDateString();
                        forecast.appendChild(differentDay);
                        const dailyTemp = document.createElement('p');
                        forecast.appendChild(dailyTemp);
                        dailyTemp.innerHTML = 'Max temperature ' + Math.round(data.daily[i].temp.max) + '°C & Min temperature ' + Math.round(data.daily[i].temp.min) + '°C';
                    }
                })
        })
}