// Global map variables
let NewBorderColor = '#137333';
let NewFillColor = '#137333';
let NewTitle = 'Denver, CO';
var map;
const markers = [];
let menu;

// Initialize the Map
async function initMap() {
    const { Map, InfoWindow } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    map = new Map(document.getElementById('map'), {
        center: { lat: 40, lng: -104 },
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
    menu.style.left = '5%';
    menu.style.transform = 'translateX(-50%)';
    document.body.appendChild(menu);
}

// Pin creator function
function pinCreator(PinPlotData) {
    if (PinPlotData.lat && PinPlotData.lng) {
        const contentNode = document.createElement('div');
        contentNode.style.position = 'absolute';
        contentNode.style.width = '40px';
        contentNode.style.height = '40px';
        contentNode.style.transform = 'translate(-50%, -50%)';

        const img = document.createElement('img');
        img.src = 'http://localhost:8000/Shroom_Image.jpg';
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.borderRadius = '50%';
        img.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
        contentNode.appendChild(img);

        const markerNewPod = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: PinPlotData.lat, lng: PinPlotData.lng },
            map: map,
            title: PinPlotData.name,
            content: contentNode,
            gmpClickable: true
        });
        markers.push(markerNewPod);

        markerNewPod.addListener('gmp-click', () => {
          console.log('Marker clicked!');
      
          // Define the measurements
          const measurements = ['SHum', 'STemp', 'Ph', 'SBA MQ', 'H MQ', 'CO MQ', 'Meth MQ', 'AHum', 'ATemp', 'APress', 'CO2', 'Light'];
      
          // Generate the menu content
          let menuContent = `
              <div style="position: relative;">
                  <button onclick="closeMenu()" style="position: absolute; top: 5px; right: 5px; background-color: red; color: white; border: none; border-radius: 3px; padding: 5px; cursor: pointer;">X</button>
                  <h3>${PinPlotData.name}</h3>
                  <p>${PinPlotData.description}</p>
                  <p><strong>Latitude:</strong> ${PinPlotData.lat}</p>
                  <p><strong>Longitude:</strong> ${PinPlotData.lng}</p>
                  <div>
                      <h4>Measurements:</h4>
          `;
      
          // Add buttons for each measurement
          measurements.forEach(measurement => {
              menuContent += `<button onclick="graphMeasurement('${measurement}')">Graph ${measurement}</button><br>`;
          });
      
          menuContent += `</div></div>`;
      
          // Set the menu content and display it
          menu.innerHTML = menuContent;
          menu.style.zIndex = '1000';
          menu.style.display = 'block';
      });

  console.log("Marker created successfully at:", PinPlotData.lat, PinPlotData.lng);
} else {
  console.error("Invalid PinPlotData:", PinPlotData);


}

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
  // MENU FUNCTIONS
  function closeMenu() {
    menu.style.display = 'none'; // Hide the menu
}

// Measurement Functions
function graphSHum() {
  console.log("Graphing SHum...");
  alert("Graphing SHum");
}

function graphSTemp() {
  console.log("Graphing STemp...");
  alert("Graphing STemp");
}

function graphPh() {
  console.log("Graphing Ph...");
  alert("Graphing Ph");
}

function graphSBAMQ() {
  console.log("Graphing SBA MQ...");
  alert("Graphing SBA MQ");
}

function graphHMQ() {
  console.log("Graphing H MQ...");
  alert("Graphing H MQ");
}

function graphCOMQ() {
  console.log("Graphing CO MQ...");
  alert("Graphing CO MQ");
}

function graphMethMQ() {
  console.log("Graphing Meth MQ...");
  alert("Graphing Meth MQ");
}

function graphAHum() {
  console.log("Graphing AHum...");
  alert("Graphing AHum");
}

function graphATemp() {
  console.log("Graphing ATemp...");
  alert("Graphing ATemp");
}

function graphAPress() {
  console.log("Graphing APress...");
  alert("Graphing APress");
}

function graphCO2() {
  console.log("Graphing CO2...");
  alert("Graphing CO2");
}

function graphLight() {
  console.log("Graphing Light...");
  alert("Graphing Light");
}
  