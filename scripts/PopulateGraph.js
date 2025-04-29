function createChart(data, yAxisVariable) {
    if (!Array.isArray(data)) {
        console.error('Expected data to be an array, but got:', data);
        return;
    }

    const xValues = [];
    const yValues = [];

    for (let i = 0; i < data.length; i++) {
        const point = data[i];
        xValues.push(point.time); // Make sure `time` exists in your data
        yValues.push(point[yAxisVariable]);
    }

    const trace = {
        x: xValues,
        y: yValues,
        mode: 'lines+markers',
        name: yAxisVariable,
        type: 'scatter'
    };

    const layout = {
        title: { text: 'EVA Pod Data' },
        height: 600,
        width: 900,
        xaxis: {
            title: {
                text: 'Time (year-month-day hour-minute-second)'
            },
                type: 'date',
    tickformat: '%Y-%m-%d %H:%M:%S',
    tickangle: -20
        },
        yaxis: {
            title: {
                text: yAxisVariable
            }
        }
    };

    Plotly.newPlot('EVA-plot-div', [trace], layout);
    document.getElementById("EVA-plot-div").style.display = "block";
}
