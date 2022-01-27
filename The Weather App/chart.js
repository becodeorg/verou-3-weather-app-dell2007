export function forecastChart(hourlyForecast, timeStamp) {
    const newChart = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(newChart, {
        type: 'line',
        data: {
            labels: timeStamp,
            datasets: [{
                label: 'Temp p/ hour',
                data: hourlyForecast,
                hoverRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: 'white', 
                        callback: function(value, index, ticks) {
                            return value;}
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });
}