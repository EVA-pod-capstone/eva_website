// New_Pod.js
// This file is used to create a new pod and save the location of the pod
//---------------------------------------------------------------------------------//


//The openPopup function, which is called in map_script.js, begins the opening of the popup. 

function PopupCreation() {
    document.getElementById("popup").style.display = "block";
}
//This function begins the reading of the CSV file, and once the file is fully loaded into the site, send it to handleFileLoad
function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
    console.log(event);  // logs data in the console
    //document.getElementById('fileContent').textContent = event.target.result; //Displays the file content in the site
    data = event.target.result;   //Moves the data in the file (event.target.result) to data
    //Hides the Popup once you have pressed the save button.
    
    // Splits the file content into lines
    lines = data.split('\n');

    // Save the name and description of the pod
    var Name = document.getElementById("Name").value; //Saves Name of the pod as Name
    var Description = document.getElementById("Description").value; //Saves Description of the pod as Description 
    
    // Initialize the podData object
    let podData = {
        name: Name,
        description: Description,
        measurments: [],
    };


    // Iterates ove the lines, starting from the second line (skipping the header)
    for (let i = 1; i < lines.length-2; i++) {
        const array = lines[i].split(",");
        const measurementNumber = i //Allows indexing based on which measurement this is.
        // Create a measurement object, which reorders the data from the CSV file into a more logical format. Read Data Storage Information for more information.   
        const measurement = {
            measurmentNumber: measurementNumber,
            time: array[0],
            latitude: parseFloat(array[1]),
            longitude: parseFloat(array[2]),
            soilHumidity: array[3],
            SoilTemperature: array[4],
            PH: array[5],
            SulfurBenzineAmmoniaMQ: array[11],
            hydrogenMQ: array[12],
            carbonMonoxideMQ: array[13],
            methaneMQ: array[14],
            airHumidity: array[6],
            airPressure: array[7],
            airTemperature: array[8],
            carbonDioxide: array[9],
            light: array[10]
        };
        //Creates a latitude and longitude value for us to use for plotting the pod on the map. 
        const NewLatLng = {
            lat: parseFloat(array[1]), 
            lng: parseFloat(array[2])
        };
    
    // Add the measurements to the podData object
    podData.measurments.push(measurement);
    }

    // Log the podData object to the console
    console.log(podData);

    // Convert the podData object into a JSON string
    const podDataString = JSON.stringify(podData);

    // Create a Blob from the JSON string
    const blob = new Blob([podDataString], { type: "application/json" });

    // Set the download attribute with a filename
    const link = document.createElement("a");

    // Generate a unique file name based on lat and lng
    const firstMeasurement = podData.measurments[0];       // Looks at the first list of measurements. Could look at any of them though.
    const latitude = firstMeasurement.latitude.toFixed(4); // Limit to 4 decimal places. Read New Pod instructions for why we are using 4 digits
    const longitude = firstMeasurement.longitude.toFixed(4); // Limit to 4 decimal places
    const filename = `podData_${latitude}_${longitude}.json`;
    
    // Set the download attribute with a filename
    link.download = filename;

    // Create a URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob);

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
    }

//Saves the name and description of the pod and then creates the pin.
function SavePodVars(podData) {
//Places podData into the console for debugging purposes.
    console.log(podData);
//Hides the popup once the save button is pressed.
    document.getElementById("popup").style.display = "none";
// A global variable that map_script.js can reference to know where the pin should be placed and what to put in the description and name
var PinPlotData ={
    lat: NewLatLng.lat, //Latitude from NewLatLng
    lng: NewLatLng.lng, //Longitude from NewLatLng
    name: document.getElementById("Name").value,  //Name from the HTML Name input
    description: document.getElementById("Description").value //Description from the HTML Description input
}
    pinCreator(PinPlotData);// The end of saveVars function UPDATE WITH LAT LNG DATA
};

// Called in the HTML file, prepares the site to wait for a change in the file input.
function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  }







//Creating a new pin on the map with the data from the popup. 
//Commenting to create new function in map_script.js
/*
function pinCreator(podData) {
    if(podData.lat && podData.lng) {

        const markerNewPod = new AdvancedMarkerElement({
            position: { lat: parseFloat(podData.lat), lng: parseFloat(podData.lng) },
            map: map, 
            title: podData.name,
            content: podData.description,
            gmpClickable: true,
          });

  
        const infoWindow = new google.maps.InfoWindow({
            content: `<h1>${podData.name}</h1><p>${podData.description}</p>`
        });
        
        infoWindow.open(map, markerNewPod);
        //This is the event listener that allows the user to click on the pin and have the description of the pod pop up.
        //This description should contain a name, description, and other information. 
        
    }

} //The end of podCreator Function
 */