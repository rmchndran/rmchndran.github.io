document.addEventListener('DOMContentLoaded', function() {
    const locationName = document.getElementById('locationHeader');
    var display = document.getElementById('mapsOne')
    var map = L.map('mapOne').setView([52.44157, 13.21203], 14);
    console.log(map.getZoom())

    L.tileLayer(L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map))

    var customIcon = L.icon({
        iconUrl:'bearicon.png',
        iconSize:[34,28],
        iconAnchor:[19,35],
        popupAnchor:[0,-32],

    })
    
    var pinpointLake = L.marker([52.44053, 13.20963],{icon:customIcon}).addTo(map);
    pinpointLake.bindPopup("Superb spot for a swim and a beer!");

    var pinpointBeer = L.marker([52.43955, 13.21470],{icon:customIcon}).addTo(map);
    pinpointBeer.bindPopup("One can buy a beer here after the walk from Mexikoplatz.");

    var pinpointBus = L.marker([52.43745, 13.23202],{icon:customIcon}).addTo(map);
    pinpointBus.bindPopup("A convenient stop on the 118 bus for propsective swimmmers.")

    var swimBounds = 
    [[52.4401,13.21088],
    [52.4401,13.20889],
    [52.44186,13.20889],
    [52.44186, 13.21088]]
    
    var interestZone = L.polygon(swimBounds,{color: "#850000", weight:1}).addTo(map);
    
    if(map.getZoom() > 14) {
        interestZone.addTo(map);
    }

    var latLngs = [
        [52.43955, 13.21470],
        [52.43438, 13.21765],
        [52.434815, 13.219669],
        [52.43456, 13.21979],
        [52.434935, 13.221710],
        [52.435130, 13.221636],
        [52.43555, 13.22326],
        [52.437514, 13.222447],
        [52.43748, 13.22629],
        [52.43630, 13.22711],
        [52.43705, 13.23079],
        [52.43683, 13.23152],
        [52.43745, 13.23202]
    ];

    var nearestBus = L.polyline(latLngs, {color: "#850000"}).addTo(map);

    document.getElementById('btn-be').addEventListener('click', function() {
        map.flyTo([52.51612, 13.37699], 18)
        var centreBerlin = L.marker([52.51620, 13.37699],{icon:customIcon}).addTo(map);
        locationName.innerHTML = "Brandenberg Tor";
    })
})

