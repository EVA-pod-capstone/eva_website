const ctx = document.getElementById('myChart');
yAxisVariable = "carbonDioxide"; // Default y-axis variable

document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:8000/Graph_Test_File.json')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then(function (Graph_Test_File) {
      console.log(Graph_Test_File); // Log the fetched data
      const measurments = Graph_Test_File.measurments; // Access the "measurements" array

      if (!measurments || !Array.isArray(measurments)) {
        console.error('Measurements is missing or not an array:', measurments);
        return;
      }

      createChart(measurments, 'line', yAxisVariable);
    })
    .catch(function (error) {
      console.error('Error fetching data:', error);
    });
});

function createChart(data, type, yAxisVariable) {
  if (!Array.isArray(data)) {
    console.error('Expected data to be an array, but got:', data);
    return;
  }

  new Chart(ctx, {
    type: type,
    data: {
      labels: data.map(row => row.time), // Access "time" field in each measurement
      datasets: [{
        label: yAxisVariable,
        data: data.map(row => parseFloat(row[yAxisVariable])), // Access the yAxisVariable dynamically and parse as float
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false
    }
  });
}
/*
Idea is that when given the json file and we know the desired measurement
(selected via menu) vs time.
*/
/*function fetchJSONData() {
    fetch('Graph_Test_File.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => console.log(data))  
        .catch(error => console.error('Failed to fetch data:', error)); 
}
fetchJSONData();
*/
/*function createGraph(jsonData, yAxisType) {
    console.log(jsonData);  // logs data in the console
    fetch("C:\Users\sydne\Documents\Capstone\Website\Graph_Test_File.json")
    // Extract time and y-axis values from jsonData
    const xValues = jsonData.map(entry => entry.time);
    const yValues = jsonData.map(entry => entry[yAxisType]);

    const myChart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Time vs ' + yAxisType
            },
            legend: { display: false },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Example usage:
// Assuming jsonData is an array of objects with 'time' and various y-axis types as keys
const jsonData = [
    { time: '2025-03-13T00:00:00Z', temperature: 20, humidity: 30 },
    { time: '2025-03-13T01:00:00Z', temperature: 21, humidity: 35 },
    // more data...
];
createGraph(jsonData, 'temperature');
  

  // Print menu of graphable data
  function menu(){

  }*/