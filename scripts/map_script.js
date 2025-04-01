// map variables in global 
 let NewLatLng      = { lat: 39.7392, lng: -104.9903 };      
 let NewBorderColor = "#137333";                           
 let NewFillColor   = "#137333";
 let NewTitle       = "Denver, CO";
 //var AdvancedMarkerElement;
 var PinElement;
 var map;
 var markerNewPod;


//Initialize the Map
async function initMap() {
  //request needed libraries 
   const { Map, InfoWindow } = await google.maps.importLibrary("maps");
   const { AdvancedMarkerElement , PinElement } = await google.maps.importLibrary("marker");
  // initialize the map variable
  map = new Map(document.getElementById("map"), {
    center: {lat: 40, lng: -104},
    zoom: 10,
    mapId: '9c6265d2e2cffa4e',
    scrollwheel: true,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true

  });

  const infoWindow = new InfoWindow();
}

//Custom Marker for new pod
//pin for clicking
function pinCreator(podData) {
  if (podData.lat && podData.lng) {
    const markerNewPod = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: parseFloat(podData.lat), lng: parseFloat(podData.lng) },
      map: map, 
      title: podData.name,
//      content: podData.description,
      gmpClickable: true,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h1>${podData.name}</h1><p>${podData.description}</p>`
    });

    markerNewPod.addListener('gmp-click', () => {
      infoWindow.open(map, markerNewPod);
    });
    

  }

// this is only going to work when a new marker pod is created. Once another is created, it will be inaccessable. 
// find solution after finishing the data structuring. 
// google.maps.event.addListener(markerNewPod, 'click', function() {window.location.href = marker.url;});

// AIR QUALITY
var antennasCircle = new google.maps.Circle({
    strokeColor: 'blue',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: 'blue',
    fillOpacity: 0.35,
    map: map,
    center: {
      lat: parseFloat(podData.lat),
      lng: parseFloat(podData.lng)
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
      lat: parseFloat(podData.lat),
      lng: parseFloat(podData.lng)
    },
    radius: 500
  });
  initMap;//Refreshes map? 
}
  