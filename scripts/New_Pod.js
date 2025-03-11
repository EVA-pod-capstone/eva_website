// New_Pod.js
// This file is used to create a new pod and save the location of the pod
//---------------------------------------------------------------------------------//
// Called in the HTML file, prepares the site to wait for a change in the file input.
function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  }

//This function begins the reading of the CSV file, and once the file is fully loaded into the site, send it to handleFileLoad
function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
    console.log(event);  // logs data in the console
    document.getElementById('fileContent').textContent = event.target.result;
    data = event.target.result;   //Moves the data in the file (event.target.result) to data
    //Hides the Popup once you have pressed the save button.
    
    // Splits the file content into lines
    lines = data.split('\n');

    // Read the name and description from the HTML Input fields
    const Name = document.getElementById("Name").value;
    const Description = document.getElementById("Description").value;
    // Initialize the podData object
    let podData = {
        name: Name,
        description: Description,
        measurments: [],
    };

    // Iterates ove the lines, starting from the second line (skipping the header)
    for (let i = 1; i < lines.length; i++) {
        const array = lines[i].split(",");
        const measurementNumber = i //Allows indexing based on which measurement this is.

        const measurement = {
            measurmentNumber: measurementNumber,
            time: array[0],
            latitude: parseFloat(array[1]),
            longitude: parseFloat(array[2]),
            soilHumidity: array[3],
            SoilTemperature: array[4],
            PH: array[5],
            SulfurBenzineAmmoniaMQ: array[6],
            hydrogenMQ: array[7],
            carbonMonoxideMQ: array[8],
            methaneMQ: array[9],
            airHumidity: array[10],
            airTemperature: array[11],
            airPressure: array[12],
            carbonDioxide: array[13],
            light: array[14]
        };

        // Add the measurements to the podData object
        podData.measurments.push(measurement);
        }
    // Log the podData object to the console
    console.log(podData);

    // Convert the podData object into a JSON string
    const podDataString = JSON.stringify(podData);

    // Create a Blob from the JSON string
    const blob = document.createElement('a');

    // Set the download attribute with a filename
    const link = document.createElement("a");

    // Generate a unique file name based on lat and lng
    const firstMeasurement = podData.measurments[0];
    const filename = `testFileName.json`;
    //const filename = `podData_${firstMeasurement.latitude}_${firstMeasurement.longitude}.json`;

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
    
//The openPopup function, which is called in map_script.js, begins the opening of the popup. 

function PopupCreation() {
    document.getElementById("popup").style.display = "block";
}

//Pulls saveVars from popup HTML file and saves the variables Lat and Lng.
function SavePodVars() {
    var Lat = document.getElementById("Lat").value; //Saves latitude as Lat
    var Lng = document.getElementById("Lng").value; //Saves longitude as Lng
    var Name = document.getElementById("Name").value; //Saves Name of the pod as Name
    var Description = document.getElementById("Description").value; //Saves Description of the pod as Description

// We can put other labels/variables here if we want to save more information. 
// This is the data that will be saved to the database.

    podData ={
        name: Name,
        description: Description,               
        //Pod Identifiers
//        MeasurementNumber: 1      dont know how to do this part yet... Gotta look online for some help
        Time: Time,
        Latitude: Lat,
        Longitude: Lng,                         
        //Data Identifiers
        SoilHumidity: SHum,
        SoilTemperature: STemp,
        PH: PH,
        SulfurBenzineAmmoniaMQ: SBA,
        HydrogenMQ: H,
        CarbonMonoxideMQ: CO,
        MethaneMQ: Meth,                           
        //Soil Data
        AirHumidity: AHum,
        AirTemperature: ATemp,
        AirPressure: APress,
        CarbonDioxide: CO2, 
        Light:  Light,                         
        //Air Data
    };
//Places podData into the console for debugging purposes.
    console.log(podData);

    
    document.getElementById("popup").style.display = "none";
    

    pinCreator(podData);// The end of saveVars function
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