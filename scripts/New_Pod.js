// New_Pod.js
// This file is used to create a new pod and save the location of the pod
//---------------------------------------------------------------------------------//

let PinLatLng;
let podData;

//The openPopup function, which is called in map_script.js, begins the opening of the popup. 
function PopupCreation() {
    document.getElementById("Add_pod_popup").style.display = "block";
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
    

    const firstLine = lines[1].split(",");
    // Initialize the podData object   
    podData = {
        name: Name,
        description: Description,
        latitude: parseFloat(firstLine[1]),
        longitude: parseFloat(firstLine[2]), 
        measurments: [],
    };

    //Creates a latitude and longitude value for us to use for plotting the pod on the map.
    PinLatLng = {
        lat: parseFloat(firstLine[1]), 
        lng: parseFloat(firstLine[2])
    };


    // Iterates ove the lines, starting from the second line (skipping the header)
    for (let i = 1; i < lines.length-2; i++) {
        const array = lines[i].split(",");
        const measurementNumber = i //Allows indexing based on which measurement this is.
        // Create a measurement object, which reorders the data from the CSV file into a more logical format. Read Data Storage Information for more information.   
        const measurement = {
            measurmentNumber: measurementNumber,
            time: array[0],
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
  
    // Add the measurements to the podData object
    podData.measurments.push(measurement);
    }

    // Log the podData object to the console
    console.log(podData);

}
//Saves the file to the site and then sends the data to the console for debugging purposes.
function SavePodVars() {
    console.log(podData);
    // Convert the podData object into a JSON string
    const podDataString = JSON.stringify(podData);

    console.log(podDataString); // Log the JSON string to the console

    // Create a Blob from the JSON string
    const blob = new Blob([podDataString], { type: "application/json" });

    // Set the download attribute with a filename
    const link = document.createElement("a");

    // Generate a unique file name based on lat and lng
    const latitude = PinLatLng.lat.toFixed(4); // Limit to 4 decimal places. Read New Pod instructions for why we are using 4 digits
    const longitude = PinLatLng.lng.toFixed(4); // Limit to 4 decimal places
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


//Places podData into the console for debugging purposes.
    console.log(podData);
//Hides the popup once the save button is pressed.
    document.getElementById("Add_pod_popup").style.display = "none";
// A global variable that map_script.js can reference to know where the pin should be placed and what to put in the description and name
var PinPlotData ={
    lat: PinLatLng.lat, //Latitude from NewLatLng
    lng: PinLatLng.lng, //Longitude from NewLatLng
    name: document.getElementById("Name").value,  //Name from the HTML Name input
    description: document.getElementById("Description").value //Description from the HTML Description input
}
    pinCreator(PinPlotData);// The end of saveVars function UPDATE WITH LAT LNG DATA
};

// Called in the HTML file, prepares the site to wait for a change in the file input.
function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  }

CloseAddPopup = () => {
    document.getElementById("Add_pod_popup").style.display = "none";
  }