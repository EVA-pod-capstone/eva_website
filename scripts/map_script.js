// Global map variables
let NewBorderColor = '#137333';
let NewFillColor = '#137333';
let NewTitle = 'Denver, CO';
var map;
const markers = [];
let menu;
let measurmentArray = [];
fetch('http://localhost:8000/Graph_Test_File.json')
.then(function (response) {
  if (response.ok) {
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
    menu.style.right = '72%';
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
          const measurements = ['Soil_Humidity', 'Soil_Temperature', 'PH', 'Sulfur_Benzine_Ammonia_MQ', 'Hydrogen_MQ', 'CO_MQ', 'Methane_MQ', 'Air_Humidity', 'Air_Temperture', 'Air_Pressure', 'CO2', 'Light'];
      
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
            const functionName = `graph${measurement.replace(/\s+/g, '')}`; // Generate function name dynamically
            menuContent += `<button onclick="${functionName}()">Graph ${measurement}</button><br>`;
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
  