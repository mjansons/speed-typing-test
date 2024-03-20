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
        this.testDuration = this.testInstance.testDuration;
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

    async processNewData(){
        // generated during test:
        this.allTypedexcessChars = this.testInstance.allTypedexcessChars;
        this.allTypedCorrectChars = this.testInstance.allTypedCorrectChars;
        this.allTypedWrongChars = this.testInstance.allTypedWrongChars;

        // generated after test
        this.correctChars = this.testInstance.correctChars;
        this.wrongChars = this.testInstance.wrongChars;
        this.excessChars = this.testInstance.excessChars;
        this.missedChars = this.testInstance.missedChars;
        this.totalChars =  this.correctChars + this.wrongChars + this.excessChars

        this.AllTypedTotalChars = this.allTypedCorrectChars + this.allTypedWrongChars + this.allTypedexcessChars;
        this.currentWpm = Math.floor((this.correctChars * 60 / this.testDuration) / 4.7) // 4.7 == average word length in English
        this.currentAcc =  Math.floor((this.allTypedCorrectChars / (this.AllTypedTotalChars + this.missedChars)) * 100);

        const currentTime = this.getCurrentDateTime();
        this.datesData.push(currentTime);
        this.wpmData.push(this.currentWpm);
        this.accuracyData.push(this.currentAcc);
    }

    async storeNewData(){
        this.storeInLocalStorage(this.datesData, `datesData`);
        this.storeInLocalStorage(this.wpmData, `wpmData`);
        this.storeInLocalStorage(this.accuracyData, `accuracyData`);
    }

    getSpeedJudgement(){
        console.log(`wpm data length ${this.wpmData.length}`)
        console.log(`wpm data ${this.wpmData}`)

        if(this.wpmData.length > 1 && this.currentWpm > this.wpmData[this.wpmData.length -2]){
            return `you were faster`
        }else if(this.wpmData.length > 1 && this.currentWpm < this.wpmData[this.wpmData.length -2]){
            return `you were slower`
        }else if(this.wpmData.length > 1 && this.currentWpm == this.wpmData[this.wpmData.length -2]){
            return `you maintained your speed`
        }else{
            return false
        }
    }

    getAccuracyJudgement(){
        console.log(`acc data length ${this.accuracyData.length}`)
        console.log(`acc data ${this.accuracyData}`)
        console.log(`current accuracy ${this.currentAcc}`)
        if(this.accuracyData.length > 1 && this.currentAcc > this.accuracyData[this.accuracyData.length - 2]){
            return `you were more accurate`
        }else if(this.accuracyData.length > 1 && this.currentAcc < this.accuracyData[this.accuracyData.length - 2]){
            return `you were less accurate`
        }else if(this.accuracyData.length > 1 && this.currentAcc == this.accuracyData[this.accuracyData.length - 2]){
            return `you maintained your accuracy`
        }else{
            return false
        }
    }
}