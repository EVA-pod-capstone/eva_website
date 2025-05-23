// New_Pod.js
// This file is used to create a new pod and save the location of the pod
//---------------------------------------------------------------------------------//
let stellaData;
let lat;
let long;
let data;

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
    // and have a button for grahing it that plots all the measurements over the full spectrum
    
    //document.getElementById('fileContent').textContent = event.target.result; //Displays the file content in the site
    data = event.target.result;   //Moves the data in the file (event.target.result) to data
    
    // Initialize the stellaData object   
    stellaData = {'latitude': lat, 'longitude': long, 'measurements': []};
    var fileName = `${lat.toFixed(4)}_${long.toFixed(4)}_stella.json`;
    
	fetch('./uploads/' + fileName )
		.then(response => {
			if (response.ok) {
				response.json()
				.then(jsonData => {
					console.log("old stella json content:", jsonData);
					stellaData = jsonData;
					parseData();
				});
		  } else {
			  console.log("no existing data found");
				parseData();
		  }
    }) 
}

function parseData(){
    // Splits the file content into lines
    lines = data.split('\n');

    var measurement = {'wavelengths': [], 'irradiance_stella_cal': [], 'irradiance_factory_cal': []};
    
    // Iterates over the lines, starting from the third line (skipping the header and first line break)
    for (let i = 2; i < lines.length-1; i++) {
        const array = lines[i].split(",");
        if (array[6] == 'line break'){
            stellaData['measurements'].push(measurement);
            measurement = {'wavelengths': [], 'irradiance_stella_cal': [], 'irradiance_factory_cal': []};
        } else {
            measurement['time'] = array[0];
            measurement['uid'] = array[2].trim();
            measurement['wavelengths'].push(parseInt(array[7]));
            measurement['irradiance_stella_cal'].push(parseFloat(array[9]));
            measurement['irradiance_factory_cal'].push(parseFloat(array[11]));
        }
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

function stellaPlot(lat, long){
	var fileName = `${lat.toFixed(4)}_${long.toFixed(4)}_stella.json`;
    
	fetch('./uploads/' + fileName )
		.then(response => {
			if (response.ok) {
				response.json()
				.then(jsonData => {
					var trace = {};
					var plotData = [];
					console.log("stella json content:", jsonData);
					measurements = jsonData.measurements;
					for (let i = 0; i < measurements.length; i++) {
						trace = {x: measurements[i].wavelengths,
								y: measurements[i].irradiance_factory_cal,
								mode: 'lines',
								name: measurements[i].time,
							}
							plotData.push(trace);
				}
					var layout = {title: {text: 'STELLA spectrometer data'}, height: 600, width: 900, 
						xaxis: {
							title: {
							  text: 'Wavelength (nm)'
							},
						  },
						  yaxis: {
							title: {
							  text: 'Irradiance (uW/(cm^2))'
							},
						  }};
				Plotly.newPlot('stella-plot-div', plotData, layout);
				document.getElementById("stella-plot-div").style.display = "block";
					
				});
		  } else {
			  alert("no stella data found");
		  }
    }) 
}

CloseStellaPopup = () => {
    document.getElementById("stella_popup").style.display = "none";
  }
