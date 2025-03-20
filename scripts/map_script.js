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
function pinCreator(PinPlotData) {
  if (PinPlotData.lat && PinPlotData.lng) {
    // Create a DOM Node for the marker content
    const contentNode = document.createElement("div");
    contentNode.style.position = "absolute"; // Changes the pin type.
    contentNode.style.transform = "translate(-50%, -100%)"; //center the image above the marker position

    // Changes the pin type. 
    const img = document.createElement("img");
    img.src = "../Shroom_Image.jpg"  // Add the image URL
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.borderRadius = "50%"; // Make it circular
    img.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)"; // Add a shadow

    contentNode.style.transform = "translate(-50%, -100%)";
    contentNode.innerHTML = `<h1>${PinPlotData.name}</h1><p>${PinPlotData.description}</p>`;

  const markerNewPod = new google.maps.marker.AdvancedMarkerElement({
    position: { lat: PinPlotData.lat, lng: PinPlotData.lng },
    map: map, 
    title: PinPlotData.name,
    content: contentNode,
    gmpClickable: true,

  });
  // Create the info window for the marker
  const infoWindow = new google.maps.InfoWindow({
    content: `<h1>${PinPlotData.name}</h1><p>${PinPlotData.description}</p>`
  });

  markerNewPod.addListener('gmp-click', () => {
    infoWindow.open(map, markerNewPod);
  });
  console.log("Marker created successfully at:", PinPlotData.lat, PinPlotData.lng);
} else {
  console.error("Invalid PinPlotData:", PinPlotData);
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
      lat: parseFloat(PinPlotData.lat),
      lng: parseFloat(PinPlotData.lng)
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
      lat: parseFloat(PinPlotData.lat),
      lng: parseFloat(PinPlotData.lng)
    },
    radius: 500
  });
  initMap;//Refreshes map? 
}
  