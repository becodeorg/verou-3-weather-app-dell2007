import Data from './config.js';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('submitButton');
const todayForecast = document.getElementById('todayForecast');
const forecast = document.getElementById('forecast');

//Actual time
// const actualDate = 


searchButton.addEventListener('click', () => {
    let cityName = searchBar.value.toLowerCase();

    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=' + Data.key)
        .then(response => response.json())
        .then(result => {
            //Latitude & longitude to search on the second API
            const lat = result.city.coord.lat;
            const lon = result.city.coord.lon;

            //City and country fetch from the first API
            const city = document.createElement('h3');
            city.setAttribute('id', 'city');
            city.innerHTML = result.city.name + ', ' + result.city.country;


            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,alert&units=metric&appid=' + Data.key)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    //Up to date forecast information box
                    const actualTime = document.createElement('p');
                    actualTime.setAttribute('id', 'timeNow');
                    actualTime.innerHTML = new Date().toLocaleString().replace(',','');
                    todayForecast.appendChild(actualTime);
                    todayForecast.appendChild(city);
                    const actualTemp = document.createElement('h3');
                    actualTemp.innerHTML = Math.round(data.current.temp) + '°C';
                    todayForecast.appendChild(actualTemp);
                    const actualIcon = document.createElement('img');
                    actualIcon.src = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';
                    actualTemp.appendChild(actualIcon);

                    for (let i = 0; i < 5; i++) {
                        const icon = document.createElement('img');
                        icon.src = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png';
                        forecast.appendChild(icon);
                        const differentDay = document.createElement('tr');
                        differentDay.innerHTML = new Date(data.daily[i].dt * 1000).toDateString();
                        forecast.appendChild(differentDay);
                        const differentTemp = document.createElement('tr');
                        forecast.appendChild(differentTemp);
                        differentTemp.innerHTML = Math.round(data.list[i].main.temp);
                    }
                })



            // for (let i = 8; i < 16; i++) {
            //     const icon = document.createElement('img');
            //     icon.src = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png';
            //     forecast.appendChild(icon);
            //     const differentTime = document.createElement('tr');
            //     differentTime.innerHTML = data.list[i].dt_txt;
            //     forecast.appendChild(differentTime);
            //     const differentTemp = document.createElement('tr');
            //     forecast.appendChild(differentTemp);
            //     differentTemp.innerHTML = Math.round(data.list[i].main.temp);
            // }
        })
})