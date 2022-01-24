import Data from './config.js';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('submitButton');
const timeRequest = document.getElementById('time');
const actualTemp = document.getElementById('temp')

searchButton.addEventListener('click', () =>{
    let cityName = searchBar.value.toLowerCase();
    console.log(cityName);

    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + Data.key)
        .then(response => response.json())
        .then(data => {
            timeRequest.innerHTML = data.list[0].dt_txt;
            actualTemp.innerHTML = data.list[0].main.temp - 273.15;
        });
})


