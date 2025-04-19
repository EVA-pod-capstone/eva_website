// New_Pod.js
// This file is used to create a new pod and save the location of the pod
//---------------------------------------------------------------------------------//

let stellaData;
let lat;
let long;

//The openPopup function, which is called in map_script.js, begins the opening of the popup. 
function stellaPopup(lat_from_eva, long_from_eva) {
    lat = lat_from_eva;
    long = long_from_eva;
    document.getElementById("stella_popup").style.display = "block";
} 


//This function begins the reading of the CSV file, and once the file is fully loaded into the site, send it to handleFileLoad
function handleSTELLAFileSelect(event){
    const newReader = new FileReader()
    newReader.onload = handleStellaFileLoad;
    newReader.readAsText(event.target.files[0])
}


function handleStellaFileLoad(event) {
    console.log(event);  // logs data in the console
    // what if instead we just read the old file and then concantenate the new data,
    // and have 
    //document.getElementById('fileContent').textContent = event.target.result; //Displays the file content in the site
    data = event.target.result;   //Moves the data in the file (event.target.result) to data
    
    // Splits the file content into lines
    lines = data.split('\n');

    // Looks at the first line of the CSV file and splits it into an array. 
    const headers = lines[0].split(","); // get headers

    // Initialize the stellaData object   
    stellaData = {
        latitude: lat,
        longitude: long, 
        measurments: [],
    };
    

    // Iterates over the lines, starting from the second line (skipping the header)
    for (let i = 1; i < lines.length-1; i++) {
        const array = lines[i].split(",");
        //const measurementNumber = i //Allows indexing based on which measurement this is.
        // Create a measurement object, which reorders the data from the CSV file into a more logical format. Read Data Storage Information for more information.   
        const measurement = {};
        for (let j = 1; j < lines.length-1; j++) {
            measurement[headers[j]] = array[j];
        }
        stellaData.measurments.push(measurement);
    }
    
    // Log the podData object to the console
    console.log(stellaData);
}

//Saves the file to the site and then sends the data to the console for debugging purposes.
function SaveStellaData() {

    // Takes the Lat, Lng, Name, and Description and puts it into AllLatLng.json file.
    // Convert the podData object into a JSON string
    const stellaDataString = JSON.stringify(stellaData);

    console.log(stellaDataString); // Log the JSON string to the console

    // Create a Blob from the JSON string
    const blob = new Blob([stellaDataString], { type: "application/json" });
    fetch(`/upload_stella.php`, {method:"POST", body:blob}).then(response => console.log(response.text()))
    // Set the download attribute with a filename
    const link = document.createElement("a");

//Places podData into the console for debugging purposes.
    console.log(stellaDataString);
//Hides the popup once the save button is pressed.
    document.getElementById("stella_popup").style.display = "none";

}

CloseStellaPopup = () => {
    document.getElementById("stella_popup").style.display = "none";
  }
