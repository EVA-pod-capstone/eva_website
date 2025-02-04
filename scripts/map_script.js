// map variable in global scope
const myLatLng = { lat: 39.7392, lng: -104.9903 };

var map;
//Initialise la map
async function initMap() {
   const { Map, InfoWindow } = await google.maps.importLibrary("maps");
   const { AdvancedMarkerElement , PinElement } = await google.maps.importLibrary("marker");
  // initialize the map variable
  map = new Map(document.getElementById("map"), {
    center: {lat: 39.7392, lng: -104.9903},
    zoom: 10,
    mapId: '9c6265d2e2cffa4e',
    scrollwheel: true,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true

  });

  const infoWindow = new InfoWindow();

//MARKER DENVER

//pin for clicking
const pinDenver = new PinElement({
    scale: 1.5,
    borderColor: "#137333",
  });

const markerDenver = new AdvancedMarkerElement({
      position: myLatLng,
      map,
      title: "Denver, CO",
      content: pinDenver.element,
      gmpClickable: true,
    });

    //google.maps.event.addListener(markerDenver, 'click', function() {window.location.href = marker.url;});

//LISTENER
markerDenver.addListener("click", ({ domEvent, myLatLng }) => {
const { target } = domEvent;

infoWindow.close();
infoWindow.setContent(markerDenver.title);
infoWindow.open(markerDenver.map, markerDenver);
});

initMap;

// AIR QUALITY
var antennasCircle = new google.maps.Circle({
    strokeColor: 'blue',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: 'blue',
    fillOpacity: 0.35,
    map: map,
    center: {
      lat: 39.7392,
      lng: -104.9903
    },
    radius: 1000
  });


    //SOIL QUALITY
    var antennasCircle = new google.maps.Circle({
    strokeColor: "#964B00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#964B00",
    fillOpacity: 0.35,
    map: map,
    center: {
      lat: 39.7392,
      lng: -104.9903
    },
    radius: 500
  });
  initMap;

}

function drawOnclick() {
  alert("clicked");
}