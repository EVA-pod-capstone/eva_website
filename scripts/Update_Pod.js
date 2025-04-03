/* So Now I get to try and find out how I want to do this.

I need to be able to read through the files in a location, and to draw the correct file from that location. 
Pulling the correct file comes from taking the lat and lng data from the csv and checking it against the lat and lng data from the
current .Jsonfile Name. That means that we can just write a string that is podData."Latitude(4)"+"Longitude(4)" and compart that with
the files until we find a match. Once we find a match, we can then pull the data from that file, and then addmend it with the new data
Finally, we reupload all of the data to the file, and then save it again. 

*/

// This is the code that I will be using to find the correct file.

function findFile(event) {
    // Show the popup
    document.getElementById("Update_pod_popup").style.display = "block";

//This function begins the reading of the CSV file, and once the file is fully loaded into the site, send it to handleFileLoad
function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
    console.log(event);  // logs data in the console
    data = event.target.result;   //Moves the data in the file (event.target.result) to data
    
    // Splits the file content into lines
    lines = data.split('\n');

    // Pulls First line of data into another array for us to use to check if the JSON file exists. 

    const firstLine = lines[1].split(",");

    //Creates a latitude and longitude value for us to use for plotting the pod on the map.
    PinLatLng = {
        lat: parseFloat(firstLine[1]), 
        lng: parseFloat(firstLine[2])
    }

    if (isNaN(lat) || isNaN(lng)) {
        console.error("Invalid latitude or longitude values in CSV");
        return;
    }
    // Creates the name of the file that we are looking to put our data into. 
    const fileName = `${lat.toFixed(4)}_${lng.toFixed(4)}.json`;
    console.log("Looking for file:", fileName);

    async function fetchFile(fileName) {
        try {
            //fetches the file with the specific file name from the server
            const response = await fetch(fileName);
            if (!response.ok) {
                throw new Error(`File not found: ${fileName}`);
            }
            const jsonData = await response.json();
            console.log("File data:", jsonData);
            return jsonData;
        } catch (error) {
            console.error(error);
        }
    }























//
    // Access the uploaded file
    const fileInput = event.target.files[0];
    if (!fileInput) {
        console.error("No file selected");
        return;
    }

    const reader = new FileReader();

    // Read the file as text
    reader.onload = function (e) {
        const data = e.target.result;

        // Split the file content into lines
        const lines = data.split("\n");

        // Validate that the file has at least two lines (header + data)
        if (lines.length < 2) {
            console.error("Invalid CSV file: Not enough lines");
            return;
        }

        // Extract the latitude and longitude from the second line (assuming it's the first data row)
        const firstDataRow = lines[1].split(","); // Adjust index if needed
        if (firstDataRow.length < 3) {
            console.error("Invalid CSV format: Missing latitude or longitude columns");
            return;
        }

        // Parse latitude and longitude
        const lat = parseFloat(firstDataRow[1]); // Assuming latitude is in the second column
        const lng = parseFloat(firstDataRow[2]); // Assuming longitude is in the third column

        if (isNaN(lat) || isNaN(lng)) {
            console.error("Invalid latitude or longitude values in CSV");
            return;
        }

        console.log("Extracted Latitude:", lat);
        console.log("Extracted Longitude:", lng);

        // Use the lat and lng values to find the corresponding JSON file
        const fileName = `podData_${lat.toFixed(4)}_${lng.toFixed(4)}.json`;
        console.log("Looking for file:", fileName);

        // Add logic here to fetch or locate the JSON file based on the fileName
    }

    // Handle file read errors
    reader.onerror = function () {
        console.error("Error reading file");
    };

    // Read the file
    reader.readAsText(file);
}}


CloseUpdatePopup= () => {
    document.getElementById("Update_pod_popup").style.display = "none";
  }