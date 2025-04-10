document.addEventListener('DOMContentLoaded', function () {
  console.log("in PopulateGraph.js");
  const ctx = document.getElementById('myGraph').getContext('2d');
  window.PopulateGraph = {
    createChart: function (data, type, yAxisVariable) {
      console.log("in createChart");
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
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          maintainAspectRatio: false
        }
      });
    }
  };
});
