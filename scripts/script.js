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
    let lines = data.split('\n');
    let headers = lines[0].split(",");

    //<canvas id="myChart" style="width:100%;max-width:700px"></canvas>
    let graph_div = document.getElementById('graphs-container');
    for (let j=1; j<headers.length; j++) {
      let name = headers[j];
      let new_chart = document.createElement('canvas');
      new_chart.setAttribute('id', 'myChart'+name);
      graph_div.appendChild(new_chart);

      let xValues = []
      let yValues = []
      for (let i = 1; i < lines.length; i++) {
        let array = lines[i].split(",")
        xValues.push(array[0])
        yValues.push(array[j])
      }
      const myChart = new Chart("myChart"+name, {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            // backgroundColor:"rgba(0,0,255,1.0)",
            borderColor: "rgba(13, 13, 118, 0.8)",
            data: yValues,
            fill: false
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: name
          }
        }
      });
  }

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