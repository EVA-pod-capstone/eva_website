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
    graph_div.innerHTML = '';
    for (let j=1; j<headers.length; j++) {
      let name = headers[j];
      let new_chart = document.createElement('div');
      new_chart.setAttribute('id', 'myChart'+name);
      graph_div.appendChild(new_chart);

      let xValues = []
      let yValues = []
      for (let i = 1; i < lines.length; i++) {
        let array = lines[i].split(",")
        xValues.push(array[0])
        yValues.push(array[j])
      }
      var trace = {
        x: xValues,
        y: yValues,
        mode: 'lines+markers',
        marker: {
          color: 'rgb(75, 0, 128)',
          size: 8
        },
        line: {
          color: 'rgb(75, 0, 128)',
          width: 1
        }
      };
     

      var layout = {
        title: {text: name}
      };
      Plotly.newPlot('myChart'+name, [trace], layout);

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