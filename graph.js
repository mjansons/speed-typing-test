export const chartSettings = {
    type: 'line',
    data: {
        labels: ['18-03-2024', '18-03-2024', '18-03-2024', '18-03-2024', '18-03-2024', '18-03-2024'],
        datasets: [{
                label: 'WPM',
                data: [], // WPM data
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                tension: 0.2,
                pointStyle: 'circle',
                pointRadius: 2,
                pointHoverRadius: 7
            },
            {
                label: 'Accuracy (%)',
                data: [], // Accuracy data
                borderColor: 'rgba(153, 102, 255, 1)',
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                tension: 0.2,
                pointStyle: 'circle',
                pointRadius: 2,
                pointHoverRadius: 7
            },
            {
                label: '',
                data: [], // Target data
                borderColor: 'rgba(153, 102, 255, 0.3)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 1,
                fill: '-1',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 0
            },
        ]
    },
    options: {
        scales: {
            x: {
                display: true,
            },
            y: {
                beginAtZero: true,
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: function(context) {
                        return `Date: ${context[0].label}`;
                    },
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y}`;
                    }
                },
                filter: function(tooltipItem) {
                    return tooltipItem.datasetIndex !== 2;
                }
            },
            legend: {
                labels: {
                    usePointStyle: true,
                    filter: function(legendItem) {
                        return legendItem.datasetIndex !== 2;
                    },
                    font: {
                        family: 'Roboto Mono, monospace',
                        size: 14
                    }
                }
            }
        }
    }
};

export function updateChartData(chart, newLabels, newWpmData, newAccuracyData) {
    const newTargetData = Array(newLabels.length).fill(100)
    chart.data.labels = newLabels;
    chart.data.datasets[0].data = newWpmData;
    chart.data.datasets[1].data = newAccuracyData;
    chart.data.datasets[2].data = newTargetData;
    chart.update();
}