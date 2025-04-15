// New_Pod.js
// This file is used to create a new pod and save the location of the pod
//---------------------------------------------------------------------------------//

let PinPlotData;
let podData;
// Called in the HTML file, prepares the site to wait for a change in the file input.
function init() {
    document.getElementById('fileInput').addEventListener('change', handleNewPodFileSelect, false);
    document.getElementById('updateFileInput').addEventListener('change', handleFileSelect, false);
  }

//The openPopup function, which is called in map_script.js, begins the opening of the popup. 
function PopupCreation() {
    document.getElementById("Add_pod_popup").style.display = "block";
}

//This function begins the reading of the CSV file, and once the file is fully loaded into the site, send it to handleFileLoad
function handleNewPodFileSelect(event){
    const newReader = new FileReader()
    newReader.onload = handleNewPodFileLoad;
    newReader.readAsText(event.target.files[0])
}


function handleNewPodFileLoad(event) {
    console.log(event);  // logs data in the console
    //document.getElementById('fileContent').textContent = event.target.result; //Displays the file content in the site
    data = event.target.result;   //Moves the data in the file (event.target.result) to data
    
    // Splits the file content into lines
    lines = data.split('\n');

    // Save the name and description of the pod
    var Name = document.getElementById("Name").value; //Saves Name of the pod as Name
    var Description = document.getElementById("Description").value; //Saves Description of the pod as Description 
    
    // Looks at the first line of the CSV file and splits it into an array. 
    const firstLine = lines[1].split(",");
    // Initialize the podData object   
    podData = {
        name: Name,
        description: Description,
        latitude: parseFloat(firstLine[1]),
        longitude: parseFloat(firstLine[2]), 
        measurments: [],
    }

    // A global variable that stores data used to plot a pin on the map. Used in both locally and server side. 
    var PinPlotData ={
        lat: parseFloat(firstLine[1]), //Latitude from the first line of code
        lng: parseFloat(firstLine[2]), //Longitude from the first line of code
        name: Name,  //Name from the HTML Name input
        description: Description //Description from the HTML Description input
    }

    //Logs the latitude and longitude of the pin to the console.
    console.log("PinPlotData:", PinPlotData); 

    //Write CODE THAT CHECKS IF POD ALREADY EXISTS IN AllLatLng.json FILE

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


    // Takes the Lat, Lng, Name, and Description and puts it into AllLatLng.json file.
    // Convert the podData object into a JSON string
    const podDataString = JSON.stringify(podData);

    console.log(podDataString); // Log the JSON string to the console

    // Create a Blob from the JSON string
    const blob = new Blob([podDataString], { type: "application/json" });

    // Set the download attribute with a filename
    const link = document.createElement("a");

    // Generate a unique file name based on lat and lng
    const latitude = PinPlotData.lat.toFixed(4); // Limit to 4 decimal places. Read New Pod instructions for why we are using 4 digits
    const longitude = PinPlotData.lng.toFixed(4); // Limit to 4 decimal places
    const filename = `${latitude}_${longitude}.json`;
    
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

}

pinCreator(PinPlotData);// The end of saveVars function UPDATE WITH LAT LNG DATA

fetch('./uploads/AllLatLng.json')
.then(function (response) {
    if (response.ok) {
        return response.json(); // Parse the JSON response
    } else {
        throw new Error("AllLatLng.json not found");
    }
})
.then(function (AllLatLng){
    console.log("file content:", AllLatLng);

    //Append the new PinPlotData to the pins array
    AllLatLng.pins.push(PinPlotData);

    console.log("Updated AlllatLng data:", AllLatLng);

    const updatedJsonString = JSON.stringify(AllLatLng); // Convert the updated object back to a JSON string
    const updatedBlob = new Blob([updatedJsonString], { type: "application/json" }); // Create a new Blob from the updated JSON string
    fetch('/AllLatLng.php', {method:"POST", body:blob}).then(response => console.log(response.text())) // Send the updated JSON string to the server

})

CloseAddPopup = () => {
    document.getElementById("Add_pod_popup").style.display = "none";
  }