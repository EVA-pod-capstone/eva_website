/* So Now I get to try and find out how I want to do this.

I need to be able to read through the files in a location, and to draw the correct file from that location. 
Pulling the correct file comes from taking the lat and lng data from the csv and checking it against the lat and lng data from the
current .Jsonfile Name. That means that we can just write a string that is podData."Latitude(4)"+"Longitude(4)" and compart that with
the files until we find a match. Once we find a match, we can then pull the data from that file, and then addmend it with the new data
Finally, we reupload all of the data to the file, and then save it again. 

*/

// This is the code that I will be using to find the correct file.

function findFile(){
    document.getElementById("Update_pod_popup").style.display = "block";
    updatePopup.style.display = "block"; // Show the popup
}


CloseUpdatePopup= () => {
    document.getElementById("Update_pod_popup").style.display = "none";
  }