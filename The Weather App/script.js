import Data from './config.js';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('submitButton');
const section = document.getElementsByTagName('section')[0];

searchButton.addEventListener('click', () => {
    let cityName = searchBar.value.toLowerCase();

    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + Data.key)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < 8; i++) {
                const differentTime = document.createElement('p');
                differentTime.innerHTML = data.list[i].dt_txt;
                section.appendChild(differentTime);
                const differentTemp = document.createElement('p');
                section.appendChild(differentTemp);
                differentTemp.innerHTML = Math.round(data.list[i].main.temp - 273.15);
            }
            for (let i = 8; i < 16; i++) {
                const differentTime = document.createElement('p');
                differentTime.innerHTML = data.list[i].dt_txt;
                section.appendChild(differentTime);
                const differentTemp = document.createElement('p');
                section.appendChild(differentTemp);
                differentTemp.innerHTML = Math.round(data.list[i].main.temp - 273.15);
            }
        })
})