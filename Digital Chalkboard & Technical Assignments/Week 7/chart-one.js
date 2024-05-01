
function displayData(csvFile) {
    const myChart = document.getElementById('myChart');
    var airlines = csvFile.map(function(d) {return d.airport});
    var inboundFlights = csvFile.map(function(d) {return d.arr_flights});
    var dataChart = new Chart(myChart, {
        type:'bar',
        options: {legend: {display:false}},
        data: {labels: airlines,
        datasets: [
            {
                label: "# Inbound Flights",
                data: inboundFlights,
                backgroundColor: "rbga(133,0,0,1)",
            }
        ]
        }
    })
}


document.addEventListener('DOMContentLoaded', function() {
    d3.csv("Southwest.csv")
    .then(displayData);
})
