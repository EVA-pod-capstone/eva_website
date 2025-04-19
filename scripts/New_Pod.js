// New_Pod.js
// This file is used to create a new pod and save the location of the pod
//---------------------------------------------------------------------------------//

let PinLatLng;
let podData;
let variable;

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
    const firstLine = lines[lines.length-3].split(","); // use last data line instead of first
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
    
    var measurementNumber = 1;
    // Iterates ove the lines, starting from the second line (skipping the header)
    for (let i = 1; i < lines.length-2; i++) {
        const array = lines[i].split(",");
        //const measurementNumber = i //Allows indexing based on which measurement this is.
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
    if (array[0].startsWith('0-00-00')){  // check that the time is valid before adding
            console.log('No measurement time, skipping');
        } else {
            podData.measurments.push(measurement);
            measurementNumber = measurementNumber + 1;
        } 
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
    fetch(`/upload.php`, {method:"POST", body:blob}).then(response => console.log(response.text()))
    // Set the download attribute with a filename
    const link = document.createElement("a");

//Places podData into the console for debugging purposes.
    console.log(podData);
//Hides the popup once the save button is pressed.
    document.getElementById("Add_pod_popup").style.display = "none";
// A global variable that map_script.js can reference to know where the pin should be placed and what to put in the description and name
var PinPlotData ={
    name: document.getElementById("Name").value,  //Name from the HTML Name input
    description: document.getElementById("Description").value, //Description from the HTML Description input
    lat: PinLatLng.lat, //Latitude from NewLatLng
    lng: PinLatLng.lng //Longitude from NewLatLng
}
    pinCreator(PinPlotData);// The end of saveVars function UPDATE WITH LAT LNG DATA

 fetch('./uploads/AllLatLng.json')
    .then(response => {
        response.json()
        .then(AllLatLng => {
            console.log("file content:", AllLatLng);
            //Append the new PinPlotData to the pins array
            AllLatLng.Pins.push(PinPlotData);
            console.log("Updated AlllatLng data:", AllLatLng);
            const updatedJsonString = JSON.stringify(AllLatLng); // Convert the updated object back to a JSON string
            const updatedBlob = new Blob([updatedJsonString], { type: "application/json" }); // Create a new Blob from the updated JSON string
            fetch('/AllLatLng.php', {method:"POST", body:updatedBlob}).then(response => console.log(response.text())) // Send the updated JSON string to the server
        });

    });

}

CloseAddPopup = () => {
    document.getElementById("Add_pod_popup").style.display = "none";
  }
