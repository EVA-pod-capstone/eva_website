// map variables in global 
 let NewLatLng      = { lat: 39.7392, lng: -104.9903 };      
 let NewBorderColor = "#137333";                           
 let NewFillColor   = "#137333";
 let NewTitle       = "Denver, CO";

var map;
//Initialize the Map
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

//Custom Marker for new pod
//pin for clicking
function pinCreation(pinData) {
  if (pinData.lat && pinData.lng) {
    const markerNewPod = new AdvancedMarkerElement({
      position: { lat: parseFloat(pinData.lat), lng: parseFloat(pinData.lng) },
      map: map, 
      title: pinData.name,
      content: pinData.description,
      gmpClickable: true,
    });
  }
}
// this is only going to work when a new marker pod is created. Once another is created, it will be inaccessable. 
// find solution after finishing the data structuring. 
google.maps.event.addListener(markerNewPod, 'click', function() {window.location.href = marker.url;});
  }// Why do you end initMap here, and then restart it a line later? 
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
      lat: lat.parseFloat(pinData.lat),
      lng: lng.parseFloat(pinData.lng)
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
      lat: lat.parseFloat(pinData.lat),
      lng: lng.parseFloat(pinData.lng)
    },
    radius: 500
  });
  initMap;// initMap here again? What is going on here? 
