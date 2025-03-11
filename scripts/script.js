// This code is for the creation of graphs and charts directly from the CSV File. Will be phased out by the code in New_Pod.js
// New_Pod.js will take the code and put it
// function init() {
//     document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
//   }
  //This function initiates the reading of the CSV file, and then sends it to the handleFileLoad function.
  // function handleFileSelect(event) {
  //   const reader = new FileReader()
  //   reader.onload = handleFileLoad;
  //   reader.readAsText(event.target.files[0])
  // }
  
  function handleFileLoad(event) {
    console.log(event);  // logs data in he console
    //document.getElementById('fileContent').textContent = event.target.result;
    data = event.target.result;   //Moves the data in the file (event.target.result) to data
    // Creates x and y arrays. Used later to store the data for each graph
    xValues = [] 
    yValues = [] //Creates x and y arrays. 
    lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) {
      array = lines[i].split(",")
      xValues.push(i)
      yValues.push(array[1])
    }
    const myChart = new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          // backgroundColor:"rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      },
      options: {}
    });
  }