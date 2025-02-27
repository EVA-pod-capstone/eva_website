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
    let data = event.target.result;
    //<canvas id="myChart" style="width:100%;max-width:700px"></canvas>
    let graph_div = document.getElementById('graphs-container');
    let new_chart = document.createElement('canvas');
    new_chart.setAttribute('id', 'myChart');
    graph_div.appendChild(new_chart);

    let xValues = []
    let yValues = []
    let lines = data.split('\n');
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      let array = lines[i].split(",")
      xValues.push(array[0])
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

    // let new_options = `<p>Select variable to plot</p>
    // <form>
    //   <input type="radio" id="html" name="fav_language" value="HTML">
    //   <label for="html">HTML</label><br>
    //   <input type="radio" id="css" name="fav_language" value="CSS">
    //   <label for="css">CSS</label><br>
    //   <input type="radio" id="javascript" name="fav_language" value="JavaScript">
    //   <label for="javascript">JavaScript</label>
    // </form>`

    // for (let i = 1; i < headers.length; i++) {
    //   new_options += `<input type="radio" id="` + header[i] + `" name="fav_language" value="` + header[i] + `">
    //   <label for="` + header[i] + `">` + header[i] + `</label><br>`
    // }


    // document.getElementById("select-plot-parameter").innerHTML = ;
  }