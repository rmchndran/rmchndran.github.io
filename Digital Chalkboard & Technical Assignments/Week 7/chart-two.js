
function displayData(csv) {
    myChart = document.getElementById("myChart2");
    // var months = new Set(csv.map(function(m) {return m.month}));
    var month_agg = new Array(12).fill(0);
    
    csv.forEach(function(r) {
        var month = parseInt(r.month);
        var delay = parseFloat(r.arr_delay);
        month_agg[month - 1] += delay;
    })

    var months = ['Jan','Feb','Mar','Apr','M','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    var newChart = new Chart(myChart, {
        type:'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: "WN Total Delay (Mins) - 2022",
                    data: month_agg,
                    backgroundColor: "rbga(133,0,0,1)"
                }
            ]
        }
    })
}


document.addEventListener('DOMContentLoaded', function() {
    d3.csv("Southwest.csv")
    .then(displayData);
});


// var months = ['Jan','Feb','Mar','Apr','M','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
