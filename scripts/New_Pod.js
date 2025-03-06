// New_Pod.js
// This file is used to create a new pod and save the location of the pod
//---------------------------------------------------------------------------------//
var podData = {};
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
// We can also create an object here that allows us to save our data to this object.
    podData ={ 
        lat: Lat,
        lng: Lng,
        name: Name,
        description: Description
    };
//Places Lat and Lng into the console for debugging purposes.
    console.log(podData);
//Hides the Popup once you have pressed the save button.
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