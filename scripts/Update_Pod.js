/* So Now I get to try and find out how I want to do this.

I need to be able to read through the files in a location, and to draw the correct file from that location. 
Pulling the correct file comes from taking the lat and lng data from the csv and checking it against the lat and lng data from the
current .Jsonfile Name. That means that we can just write a string that is podData."Latitude(4)"+"Longitude(4)" and compare that with
the files until we find a match. Once we find a match, we can then pull the data from that file, and then amend it with the new data.
Finally, we reupload all of the data to the file, and then save it again. 

*/

// Global object to store uploaded files
//let oldJsonData;
//let uploadedFiles = {};
let jsonData;
let fileName;
let newPodData;

function findFile(){
    document.getElementById("Update_pod_popup").style.display = "block";
}

// This function begins the reading of the CSV file, and once the file is fully loaded into the site, sends it to handleFileLoad
function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
    console.log(event); // Logs data in the console
    const data = event.target.result; // Moves the data in the file (event.target.result) to data

    // Splits the file content into lines
    const lines = data.split("\n");

    // Pulls the first line of data into another array for us to use to check if the JSON file exists.
    const firstLine = lines[lines.length-3].split(","); // use last data line instead of first

    // Creates a latitude and longitude value for us to use for plotting the pod on the map.
    const PinLatLng = {
        lat: parseFloat(firstLine[1]),
        lng: parseFloat(firstLine[2]),
    };

    if (isNaN(PinLatLng.lat) || isNaN(PinLatLng.lng)) {
        console.error("Invalid latitude or longitude values in CSV");
        return;
    }
    
    // Creates the name of the file that we are looking to put our data into.
    fileName = `${PinLatLng.lat.toFixed(4)}_${PinLatLng.lng.toFixed(4)}.json`;
    console.log("Looking for file:", fileName);
    // Pull the file with the correct name from the server and put the data from it into jsonData
    fetch('./uploads/' + fileName )
    .then(response => {
        response.json()
        .then(fileData => {
        jsonData = fileData; // Store the JSON data in a global variable
        console.log("Previous data:", jsonData);
        });
    });

     newPodData = {
        name: Name,
        description: Description,
        latitude: parseFloat(firstLine[1]),
        longitude: parseFloat(firstLine[2]), 
        measurments: [],
    };

    var measurementNumber = jsonData.measurments.length + 1; //Allows indexing based on which measurement this is.
     // Iterates over the lines, starting from the second line (skipping the header)
    for (let i = 1; i < lines.length-2; i++) {
        const array = lines[i].split(",");
       // const measurementNumber = i //Allows indexing based on which measurement this is.
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
            console.log('No measurement time, skipping');  // Skips
        } else {
            newPodData.measurments.push(measurement);
            measurementNumber = measurementNumber + 1;
        }  
    }

    // Log the podData object to the console
    console.log(newPodData);

    appendDataToJson(jsonData);
}


function SaveUpdatedPod() {

};

    

 function appendDataToJSON(oldJsonData){
     let UpdatedJSON = oldJsonData;
    UpdatedJSON.measurments = UpdatedJSON.measurments.concat(newPodData.measurments );
    // Save the updated JSON object to the server
    const updatedJsonString = JSON.stringify(UpdatedJSON);
    const blob = new Blob([updatedJsonString], { type: "application/json" });
    fetch('/upload.php', {method:"POST", body:blob}).then(response => console.log(response.text()))
}

// This function closes the popup when the user clicks the close button
CloseUpdatePopup = () => {
    document.getElementById("Update_pod_popup").style.display = "none";
};
