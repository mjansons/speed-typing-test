import getWords from "./api.js";
import SpeedTypingTest from "./speedtest.js";
import TestData from "./memory.js";

let testDuration = 15;
let testRuns = false;


async function runTest() {
    const firstTest = new SpeedTypingTest(`.words`, `.timer`, testDuration, getWords, `normalise`);
    const testData = new TestData(firstTest);
    testData.fetchAllStoredData();
    await firstTest.startNewTest();
    testData.parseNewData();
    console.log(
        datesData = [];
    wpmData = [];
    accuracyData = [];

    // generated during test:
    allTypedexcessChars = 0;
    allTypedCorrectChars = 0;
    allTypedWrongChars = 0;

    // generated after test
    correctChars = 0;
    wrongChars = 0;
    excessChars = 0;
    missedChars = 0;

    currentWpm = 0;
    currentAcc = 0;

    )
    testData.storeNewData();
    // upload results to memory


    toggleDisplay(`.stats`, `.test`);

    document.addEventListener(`keydown`, async function(event){
        if(event.key == `Escape` && testRuns == false){
            testRuns = true;
            toggleDisplay(`.stats`, `.test`);
            await firstTest.startNewTest();
            // upload results to memory



            toggleDisplay(`.stats`, `.test`)
            testRuns = false;
        }else if (event.key == `Enter` && testRuns == false){
            testRuns = true;
            toggleDisplay(`.stats`, `.test`);
            await firstTest.restartSameTest();
            // upload results to memory



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