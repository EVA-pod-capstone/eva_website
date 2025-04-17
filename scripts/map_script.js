// map variables in global      
 let NewBorderColor = "#137333";                           
 let NewFillColor   = "#137333";
 let NewTitle       = "Denver, CO";
 //var AdvancedMarkerElement;
 var PinElement;
 var map;
 var markerNewPod;
const markers = [];
let menu;
let measurmentArray = [];

function populateMeasArray(lat, lng){
	fetch('./uploads/' + lat + '_' + lng + '.json')
	.then(function (response) {
	  if (response.ok) {
		console.log(response);
	    return response.json();
	  } else {
	    throw new Error('Failed to fetch data');
	  }
	})
	.then(function (Graph_Test_File) {
	  console.log('Fetched data:', Graph_Test_File); // Debugging log
	   measurmentArray = Graph_Test_File.measurments; // Access the "measurements" array

	  if (!measurmentArray || !Array.isArray(measurmentArray)) {
	    console.error('MeasurementArray is missing or not an array:', measurmentArray);
	    return;
	  }

	})
	.catch(function (error) {
	  console.error('Error fetching data:', error);
	});
}


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

   // Create the menu element after the DOM is fully loaded
    menu = document.createElement('div');
    menu.id = 'customMenu';
    menu.style.position = 'fixed';
    menu.style.backgroundColor = 'white';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    menu.style.display = 'none';
    menu.style.bottom = '0px';
    menu.style.right = '72%';
    menu.style.transform = 'translateX(-50%)';
    document.body.appendChild(menu);
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
    console.log('Marker clicked!');
      
          // Define the measurements
          const measurements = ['Soil_Humidity', 'Soil_Temperature', 'PH', 'Sulfur_Benzine_Ammonia_MQ', 'Hydrogen_MQ', 'CO_MQ', 'Methane_MQ', 'Air_Humidity', 'Air_Temperature', 'Air_Pressure', 'CO2', 'Light'];
      
          // Generate the menu content
          let menuContent = `
              <div style="position: relative;">
                  <button onclick="closeMenu()" style="position: absolute; top: 5px; right: 5px; background-color: red; color: white; border: none; border-radius: 3px; padding: 5px; cursor: pointer;">X</button>
                  <h3>${PinPlotData.name}</h3>
                  <p>${PinPlotData.description}</p>
                  <p><strong>Latitude:</strong> ${PinPlotData.lat}</p>
                  <p><strong>Longitude:</strong> ${PinPlotData.lng}</p>
                  <button onclick="${functionName}()">Add STELLA data</button><br> 
                  <div>
                      <h4>Measurements:</h4>
          `; // TODO make button to upload stella data and plot it

	populateMeasArray(PinPlotData.lat, PinPlotData.lng);
      
          // Add buttons for each measurement
          measurements.forEach(measurement => {
            const functionName = `graph${measurement.replace(/\s+/g, '')}`; // Generate function name dynamically
            menuContent += `<button onclick="${functionName}()">Graph ${measurement}</button><br>`;
        });
      
          menuContent += `</div></div>`;
      
          // Set the menu content and display it
          menu.innerHTML = menuContent;
          menu.style.zIndex = '1000';
          menu.style.display = 'block';
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
function init(){
    document.getElementById('updateFileInput').addEventListener('change', handleFileSelect, false);
      document.getElementById('fileInput').addEventListener('change', handleNewPodFileSelect, false);

  fetch('./uploads/AllLatLng.json')
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
   

    }
  })
  .catch(error => {
    // Handle any network or other errors
    console.error('Error fetching JSON data:', error);
  });
  
} 


  // MENU FUNCTIONS
  function closeMenu() {
    menu.style.display = 'none'; // Hide the menu
}

// Measurement Functions
function graphSoil_Humidity() {
  console.log("Graphing SHum...");
  PopulateGraph.createChart(measurmentArray, 'line', "soilHumidity");
}

function graphSoil_Temperature() {
  console.log("Graphing STemp...");
  PopulateGraph.createChart(measurmentArray, 'line', "SoilTemperature");

}

function graphPH() {
  console.log("Graphing Ph...");
  PopulateGraph.createChart(measurmentArray, 'line', "PH");

}

function graphSulfur_Benzine_Ammonia_MQ() {
  console.log("Graphing SBA MQ...");
  PopulateGraph.createChart(measurmentArray, 'line', "SulfurBenzineAmmoniaMQ");

}

function graphHydrogen_MQ() {
  console.log("Graphing H MQ...");
  PopulateGraph.createChart(measurmentArray, 'line', "hydrogenMQ");

}

function graphCO_MQ() {
  console.log("Graphing CO MQ...");
  PopulateGraph.createChart(measurmentArray, 'line', "carbonMonoxideMQ");

}

function graphMethane_MQ() {
  console.log("Graphing Meth MQ...");
  PopulateGraph.createChart(measurmentArray, 'line', "methaneMQ");

}

function graphAir_Humidity() {
  console.log("Graphing AHum...");
  PopulateGraph.createChart(measurmentArray, 'line', "airHumidity");

}

function graphAir_Temperature() {
  PopulateGraph.createChart(measurmentArray, 'line', "airTemperature");
  console.log("Graphing ATemp...");
}

function graphAir_Pressure() {
  console.log("Graphing APress...");
  PopulateGraph.createChart(measurmentArray, 'line', "airPressure");

}

function graphCO2() {
  console.log("Graphing CO2...");
  PopulateGraph.createChart(measurmentArray, 'line', "carbonDioxide");

}

function graphLight() {
  console.log("Graphing Light...");
  PopulateGraph.createChart(measurmentArray, 'line', "light");

}

