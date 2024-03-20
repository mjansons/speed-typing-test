import getWords from "./api.js";
import SpeedTypingTest from "./speedtest.js";
import TestData from "./memory.js";
import { chartSettings, updateAllStats, toggleDisplay } from "./display.js";

let testRuns = false;

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, chartSettings);

async function runTest() {
    const firstTest = new SpeedTypingTest(`.words`, `.timer`, getWords, `normalise`);
    const testData = new TestData(firstTest);

    testData.fetchAllStoredData();
    await firstTest.startNewTest();
    await testData.processNewData();
    testData.storeNewData();
    updateAllStats(myChart, testData)
    toggleDisplay(`.stats`, `.test`);

    document.addEventListener(`keydown`, async function(event){
        if(event.key == `Escape` && testRuns == false){
            testRuns = true;
            toggleDisplay(`.stats`, `.test`);
            await firstTest.startNewTest();
            await testData.processNewData();
            testData.storeNewData();
            updateAllStats(myChart, testData)
            toggleDisplay(`.stats`, `.test`)
            testRuns = false;
        }else if (event.key == `Enter` && testRuns == false){
            testRuns = true;
            toggleDisplay(`.stats`, `.test`);
            await firstTest.restartSameTest();
            await testData.processNewData();
            testData.storeNewData();
            updateAllStats(myChart, testData);
            toggleDisplay(`.stats`, `.test`);
            testRuns = false;
        }
    });
}

runTest();
