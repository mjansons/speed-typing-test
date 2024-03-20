export const chartSettings = {
    type: 'line',
    data: {
        labels: ['18-03-2024', '18-03-2024', '18-03-2024', '18-03-2024', '18-03-2024', '18-03-2024'],
        datasets: [{
                label: 'WPM',
                data: [], // WPM data
                borderColor: 'rgba(160, 200, 156, 1)',
                pointBackgroundColor: 'rgba(160, 200, 156, 1)',
                tension: 0.2,
                pointStyle: 'circle',
                pointRadius: 1,
                pointHoverRadius: 7,
                borderWidth: 2
            },
            {
                label: 'Accuracy (%)',
                data: [], // Accuracy data
                borderColor: 'rgba(247, 122, 122, 1)',
                pointBackgroundColor: 'rgba(247, 122, 122, 1)',
                tension: 0.2,
                pointStyle: 'circle',
                pointRadius: 1,
                pointHoverRadius: 7,
                borderWidth: 2
            },
            {
                label: '',
                data: [], // Target data
                borderColor: 'rgba(247, 122, 122, 0)',
                backgroundColor: 'rgba(247, 122, 122, 0.2)',
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

export function toggleDisplay(className1, className2) {
    const elements1 = document.querySelectorAll(className1);
    const elements2 = document.querySelectorAll(className2);

    elements1.forEach(element => {
        if (element.style.display === 'none') {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });

    elements2.forEach(element => {
        if (element.style.display === 'none') {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

export function updateHTMLelement(elementClassName, content){
    document.querySelector(elementClassName).textContent = content;
}

export function updateAllStats(myChart, dataInstance){
    updateChartData(myChart, dataInstance.datesData, dataInstance.wpmData, dataInstance.accuracyData);

    updateHTMLelement(`.wpm`, dataInstance.currentWpm);
    updateHTMLelement(`.acc`, `${dataInstance.currentAcc}%`);
    updateHTMLelement(`.total`, dataInstance.totalChars);
    updateHTMLelement(`.correct`, dataInstance.correctChars);
    updateHTMLelement(`.wrong`, dataInstance.wrongChars);
    updateHTMLelement(`.excess`, dataInstance.excessChars);
    updateHTMLelement(`.missed`, dataInstance.missedChars);

    let speedJudgement = dataInstance.getSpeedJudgement();
    let accJudgement = dataInstance.getAccuracyJudgement();

    if (speedJudgement !== false){
        updateHTMLelement(`.judgement`, `${speedJudgement} ${accJudgement}`);
    }else{
        updateHTMLelement(`.judgement`, `good job!`)
    }
}

