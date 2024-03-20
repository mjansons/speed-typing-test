export default class TestData{
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

    constructor(testInstance){
        this.testInstance = testInstance;
    }

    getCurrentDateTime() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        // const hours = String(date.getHours()).padStart(2, '0');
        // const minutes = String(date.getMinutes()).padStart(2, '0');
        // const seconds = String(date.getSeconds()).padStart(2, '0');
        // const timezone = date.getTimezoneOffset() / 60;
        return `${day}-${month}-${year}`;
    }

    getFromLocalStorage(settingKeyString) {
        try {
            const settingsSavedJson = localStorage.getItem(settingKeyString);
            return settingsSavedJson ? JSON.parse(settingsSavedJson) : null;
        } catch (error) {
            console.error(`Error retrieving data from localStorage:`, error.message);
            return null;
        }
    }

    storeInLocalStorage(data, settingKeyString){
        localStorage.setItem(settingKeyString, JSON.stringify(data));
    }

    async fetchAllStoredData(){
        this.datesData = this.getFromLocalStorage(`datesData`) || [];
        this.wpmData = this.getFromLocalStorage(`wpmData`) || [];
        this.accuracyData = this.getFromLocalStorage(`accuracyData`) || [];
    }

    parseNewData(){
        // generated during test:
        this.allTypedexcessChars = this.testInstance.allTypedexcessChars;
        this.allTypedCorrectChars = this.testInstance.allTypedCorrectChars;

        // generated after test
        this.correctChars = this.testInstance.correctChars;
        this.wrongChars = this.testInstance.wrongChars;
        this.excessChars = this.testInstance.excessChars;
        this.missedChars = this.testInstance.missedChars;

        this.currentWpm = Math.floor((this.correctChars * 60 / this.testDuration) / 4.7) // 4.7 == average word length in English
        this.currentAcc =  Math.floor((this.allTypedCorrectChars / (this.allTypedCorrectChars + this.allTypedWrongChars + this.allTypedexcessChars)) * 100);

        const currentTime = getCurrentDateTime();
        this.datesData.push(currentTime);
        this.wpmData.push(this.currentWpm);
        this.accuracyData.push(this.currentAcc);
    }

    async storeNewData(){
        storeInLocalStorage(this.datesData, `datesData`);
        storeInLocalStorage(this.wpmData, `wpmData`);
        storeInLocalStorage(this.accuracyData, `accuracyData`);
    }
}