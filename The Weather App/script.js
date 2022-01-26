import Data from './config.js';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('submitButton');
const todayForecast = document.getElementById('todayForecast');
const carouselControl = document.getElementById('carouselExampleIndicators');
const dailyCarousel = document.getElementById('carousel');

//Event to search by enter or click button
searchButton.addEventListener('click',  search);

window.addEventListener('keydown', event => {
    if (event.key === 'Enter') {

        search();
    }
});

function search() {
    carouselControl.style.display = 'block';
    todayForecast.innerHTML = " "; //Remove information when search again
    dailyCarousel.innerHTML = " ";
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
                    const actualForecast = document.createElement('div');
                    actualForecast.classList.add('row');
                    todayForecast.appendChild(actualForecast);

                    const Forecast = document.createElement('article');
                    Forecast.classList.add('card', 'bg-transparent', 'border-success');
                    actualForecast.appendChild(Forecast);

                    const actualTime = document.createElement('p');
                    actualTime.setAttribute('id', 'timeNow');
                    actualTime.innerHTML = new Date(data.daily[0].dt * 1000).toDateString();
                    Forecast.appendChild(actualTime);
                    Forecast.appendChild(city);

                    const actualTemp = document.createElement('h3');
                    actualTemp.innerHTML = Math.round(data.current.temp) + '°C';
                    Forecast.appendChild(actualTemp);

                    const actualIcon = document.createElement('img');
                    actualIcon.src = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';
                    actualTemp.appendChild(actualIcon);

                    //Loop forecast following 5 days
                    const firstForecast = document.createElement('article');
                    firstForecast.classList.add('carousel-item', 'active');
                    dailyCarousel.appendChild(firstForecast);

                    const icon = document.createElement('img');
                    icon.src = 'http://openweathermap.org/img/wn/' + data.daily[0].weather[0].icon + '@2x.png';
                    firstForecast.appendChild(icon);

                    const firstDay = document.createElement('p');
                    firstForecast.appendChild(firstDay);
                    firstDay.innerHTML = new Date(data.daily[0].dt * 1000).toDateString();

                    const firstTemp = document.createElement('p');
                    firstForecast.appendChild(firstTemp);
                    firstTemp.innerHTML = 'Max temp: ' + Math.round(data.daily[0].temp.max) + '°C & Min temp: ' + Math.round(data.daily[0].temp.min) + '°C';

                    for (let i = 1; i < 5; i++) {
                        const dailyForecast = document.createElement('article');
                        dailyForecast.classList.add('carousel-item');
                        dailyCarousel.appendChild(dailyForecast);

                        const dailyIcon = document.createElement('img');
                        dailyIcon.src = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png';
                        dailyForecast.appendChild(dailyIcon);

                        const differentDay = document.createElement('p');
                        differentDay.innerHTML = new Date(data.daily[i].dt * 1000).toDateString();
                        dailyForecast.appendChild(differentDay);

                        const dailyTemp = document.createElement('p');
                        dailyForecast.appendChild(dailyTemp);
                        dailyTemp.innerHTML = 'Max Temp: ' + Math.round(data.daily[0].temp.max) + '°C & Min Temp; ' + Math.round(data.daily[0].temp.min) + '°C';
                    }
                })
        })
}