import getWords from "./api.js";
import SpeedTypingTest from "./speedtest.js";
import TestData from "./memory.js";
import { chartSettings, updateChartData } from "./graph.js";

let testDuration = 5;
let testRuns = false;

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, chartSettings);

async function runTest() {
    const firstTest = new SpeedTypingTest(`.words`, `.timer`, testDuration, getWords, `normalise`);
    const testData = new TestData(firstTest);

    testData.fetchAllStoredData();
    await firstTest.startNewTest();
    await testData.processNewData();
    testData.storeNewData();
    updateAllStats(testData)
    toggleDisplay(`.stats`, `.test`);

    document.addEventListener(`keydown`, async function(event){
        if(event.key == `Escape` && testRuns == false){
            testRuns = true;
            toggleDisplay(`.stats`, `.test`);
            await firstTest.startNewTest();
            await testData.processNewData();
            testData.storeNewData();
            updateAllStats(testData)
            toggleDisplay(`.stats`, `.test`)
            testRuns = false;
        }else if (event.key == `Enter` && testRuns == false){
            testRuns = true;
            toggleDisplay(`.stats`, `.test`);
            await firstTest.restartSameTest();
            await testData.processNewData();
            testData.storeNewData();
            updateAllStats(testData);
            toggleDisplay(`.stats`, `.test`);
            testRuns = false;
        }
    });
}

runTest();


function toggleDisplay(className1, className2) {
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

function updateHTMLelement(elementClassName, content){
    document.querySelector(elementClassName).textContent = content;
}

function updateAllStats(dataInstance){
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
        updateHTMLelement(`.judgement`, `${speedJudgement} and ${accJudgement}`);
    }else{
        updateHTMLelement(`.judgement`, `Good job!`)
    }
}
