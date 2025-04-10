/* So Now I get to try and find out how I want to do this.

I need to be able to read through the files in a location, and to draw the correct file from that location. 
Pulling the correct file comes from taking the lat and lng data from the csv and checking it against the lat and lng data from the
current .Jsonfile Name. That means that we can just write a string that is podData."Latitude(4)"+"Longitude(4)" and compare that with
the files until we find a match. Once we find a match, we can then pull the data from that file, and then amend it with the new data.
Finally, we reupload all of the data to the file, and then save it again. 

*/

// Global object to store uploaded files
let oldJsonData;
let uploadedFiles = {};
let fileName;

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
    const firstLine = lines[1].split(",");

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
    const fileName = `${PinLatLng.lat.toFixed(4)}_${PinLatLng.lng.toFixed(4)}.json`;
    console.log("Looking for file:", fileName);

function checkForFile(fileName) {
    fetch('./uploads/' + fileName )
    .then(function (response) {
        if (response.ok) {
            return response.json(); // Parse the JSON response
        } else {
            throw new Error('File not found: ' + fileName);
        }
    })
    .then(function (jsonData){
        console.log("file content:", jsonData);
        // Process the JSON content here
        appendDataToJSON(jsonData);
        console.log("Updated JSON object:", jsonData);
        // Save the updated JSON object to the server
        


    })
    .catch(function (error) {
        console.error("Error fetching file:", error);
    });

        // Convert the updated JSON object back to a string
        const updatedJsonString = JSON.stringify(jsonData, null, 2);
        console.log("Updated JSON string:", updatedJsonString);

            // save the updated Json to the server
            saveUpdatedJSON(fileName, updatedJsonString);
        };
        reader.readAsText(file);

    }

 function appendDataToJSON(oldJsonData){
    // Example new data from the CSV file
    const newData = {
        measurmentNumber: oldJsonData.measurements.length + 1, //Increment measurement number
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
    }

    if (!jsonData.measurements) {
        jsonData.measurements = []; // Ensure the measurements array exists
    }
    jsonData.measurements.push(newMeasurement);

    console.log("New data appended to JSON:", newMeasurement);

// Save the updated JSON object to the server
    UpdatedJSON.stringify(jsonData); // Convert the updated JSON object back to a string
    const blob = new Blob([updatedJsonString], { type: "application/json" });
    fetch('/upload.php', {method:"POST", body:blob}).then(response => console.log(response.text()))
}

// This function closes the popup when the user clicks the close button
CloseUpdatePopup = () => {
    document.getElementById("Update_pod_popup").style.display = "none";
};