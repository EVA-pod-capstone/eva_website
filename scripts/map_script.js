// map variables in global      
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
    contentNode.style.width = "40px"; // Set the Fixed width of the marker
    contentNode.style.height = "40px"; // Set the Fixed height of the marker
    contentNode.style.transform = "translate(-50%, -50%)"; // Center the image on marker position.


    // Changes the pin type. 
    const img = document.createElement("img");
    img.src = "./scripts/Shroom_Image.jpg"; // Use relative path
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.borderRadius = "50%"; // Make it circular
    img.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)"; // Add a shadow
    contentNode.appendChild(img);

    console.log(contentNode);
    const textContainer = document.createElement("div");
    textContainer.innerHTML = `<h1>${PinPlotData.name}</h1><p>${PinPlotData.description}</p>`;
    contentNode.appendChild(textContainer); // Append the text container to the content node


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

}


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
  initMap;
}
  

// something that parses through the AllLatLng.json file and then prints out all of the individual pins. 
// Andrew needs to write code in New_Pod.js that will create and update the AllLatLng.json file every time a new pod is created.
function addSavedPins(){
  fetch('./Data/AllLatLng.json')
  .then(response => response.json())  // Parse the JSON data from the response
  .then(data => {
    // Handle the data received from the PHP server
    console.log(data);  // Output the data to the console (or use it in your application)
    
    if (data.error) {
      console.error('Error:', data.error);  // Handle any errors returned from the PHP script
    } else {
      var pins = data.Pins;
      // Iterate through array and add pins to map
      for (let i = 0; i < pins.length; i++) {
        pinCreator(pins[i]);
      }
    //   var PinPlotData ={
    //     lat: PinLatLng.lat, //Latitude from NewLatLng
    //     lng: PinLatLng.lng, //Longitude from NewLatLng
    //     name: document.getElementById("Name").value,  //Name from the HTML Name input
    //     description: document.getElementById("Description").value //Description from the HTML Description input
    // }
    //     pinCreator(PinPlotData);

    }
  })
  .catch(error => {
    // Handle any network or other errors
    console.error('Error fetching JSON data:', error);
  });
  
} 

