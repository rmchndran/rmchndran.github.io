var interestZone = L.polygon(swimBounds,{color: "#850000", weight:1}).addTo(map);

function keyAppear() {
    var currentZoom = map.getZoom();
    console.log(currentZoom)
    if(currentZoom > 13) {
        interestZone.setStyle({opacity:0.5});
    } else {
        interestZone.setStyle({opacity:0});
    }
}

map.on("zoomend", keyAppear);