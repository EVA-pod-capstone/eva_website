function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  }
  
  function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }
  
  function handleFileLoad(event) {
    console.log(event);
    //document.getElementById('fileContent').textContent = event.target.result;
    data = event.target.result;
    xValues = []
    yValues = []
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