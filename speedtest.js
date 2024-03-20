export default class SpeedTypingTest{
    constructor(wordContainerClassName, timerClassName, testDuration = 60, getAsyncWordsFunction, textFormat = `raw`) {
        this.wordContainerClassName = wordContainerClassName;
        this.TimerclassName = timerClassName;
        this.testDuration = testDuration;
        this.getAsyncWordsFunction = getAsyncWordsFunction;
        this.textFormat = textFormat;

        this.handleKeyDown = this.handleKeyDownEvent.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.specialKeys = [`CapsLock`, `Tab`, `Enter`, `Escape`];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;

        this.isTestRunning = false;
        this.timerId = null;
        this.currentTime = this.testDuration;

        this.allTypedexcessChars = 0;
        this.allTypedCorrectChars = 0;
        this.allTypedWrongChars = 0;

        this.correctChars = 0;
        this.wrongChars = 0;
        this.excessChars = 0;
        this.missedChars = 0;
    }


// test control functions

    async startNewTest() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        this.stopTimer()
        this.currentTime = this.testDuration;
        this.updateTimerElement()

        this.currentWordIndex = 0;
        this.currentCharIndex = 0;

        this.correctChars = 0;
        this.wrongChars = 0;
        this.missedChars = 0;
        this.excessChars = 0;

        this.resetHTMLelement(this.wordContainerClassName);

        this.wordsList = await this.getAsyncWordsFunction(60, this.textFormat);
        this.addWordsToHTML(this.wordsList, this.wordContainerClassName);
        this.wordContainer = document.querySelectorAll(this.wordContainerClassName);
        this.allWords = this.wordContainer[0].children;
        this.addNewCursor(this.allWords[0], 0, `cursor-before`);
        this.divWidth = document.querySelector(this.wordContainerClassName).offsetWidth;
        this.addTestEventListeners();

        return new Promise(resolve => {
            this.intervalId = setInterval(() => {
              if (this.currentTime === 0) {
                clearInterval(this.intervalId);
                this.intervalId = null;
                resolve();
              }
            }, 1000);
          });
    }

    async restartSameTest() {
        this.stopTest();
        this.stopTimer()
        this.currentTime = this.testDuration;
        this.updateTimerElement()

        this.currentWordIndex = 0;
        this.currentCharIndex = 0;

        this.correctChars = 0;
        this.wrongChars = 0;
        this.missedChars = 0;
        this.excessChars = 0;

        this.resetHTMLelement(this.wordContainerClassName);
        this.addWordsToHTML(this.wordsList, this.wordContainerClassName);
        this.wordContainer = document.querySelectorAll(this.wordContainerClassName);
        this.allWords = this.wordContainer[0].children;
        this.addNewCursor(this.allWords[0], 0, `cursor-before`);
        this.divWidth = document.querySelector(this.wordContainerClassName).offsetWidth;
        this.addTestEventListeners();

        return new Promise(resolve => {
            const intervalId = setInterval(() => {
                if (this.currentTime === 0) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 1000);
        });
    }

    async InternalStartNewTest() {
        this.stopTimer()
        this.isTestRunning = false;
        this.currentTime = this.testDuration;
        this.updateTimerElement()

        this.currentWordIndex = 0;
        this.currentCharIndex = 0;

        this.correctChars = 0;
        this.wrongChars = 0;
        this.missedChars = 0;
        this.excessChars = 0;

        this.resetHTMLelement(this.wordContainerClassName);

        this.wordsList = await this.getAsyncWordsFunction(60, this.textFormat);
        this.addWordsToHTML(this.wordsList, this.wordContainerClassName);
        this.wordContainer = document.querySelectorAll(this.wordContainerClassName);
        this.allWords = this.wordContainer[0].children;
        this.addNewCursor(this.allWords[0], 0, `cursor-before`);
        this.divWidth = document.querySelector(this.wordContainerClassName).offsetWidth;
        this.addTestEventListeners();
    }

    InternalRestartSameTest() {
        this.stopTest();
        this.stopTimer()
        this.currentTime = this.testDuration;
        this.updateTimerElement()

        this.currentWordIndex = 0;
        this.currentCharIndex = 0;

        this.correctChars = 0;
        this.wrongChars = 0;
        this.missedChars = 0;
        this.excessChars = 0;

        this.resetHTMLelement(this.wordContainerClassName);
        this.addWordsToHTML(this.wordsList, this.wordContainerClassName);
        this.wordContainer = document.querySelectorAll(this.wordContainerClassName);
        this.allWords = this.wordContainer[0].children;
        this.addNewCursor(this.allWords[0], 0, `cursor-before`);
        this.divWidth = document.querySelector(this.wordContainerClassName).offsetWidth;
        this.addTestEventListeners();
    }

    stopTest() {
        if (this.isTestRunning) {
            this.removeTestEventListeners();
            this.isTestRunning = false;
            const allWordsArray = Array.from(this.allWords);
            const typedWords = allWordsArray.slice(0, this.currentWordIndex);
            this.updateFinalCharScore(typedWords)
        }
    }


// event listener functions

    addTestEventListeners(){
        document.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener(`resize`, this.handleResize);
    }

    removeTestEventListeners(){
        document.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener(`resize`, this.handleResize);
    }


// DOM maniupulation functions

    addWordsToHTML(wordsList, ContainerElement){
        let location = document.querySelector(ContainerElement);
        wordsList.forEach((word) => {
            let wordElement = document.createElement('div');
            wordElement.className = 'word';
            word.split('').forEach((char) => {
                let span = document.createElement('span');
                span.textContent = char;
                span.className = `char`;
                wordElement.appendChild(span);
            });
            location.appendChild(wordElement);
        });
    }

    removeHTMLelementArray(HTMLcollection){
        for (let i = HTMLcollection.length - 1; i >= 0; i--) {
            HTMLcollection[i].remove();
        }
    }

    resetHTMLelement(HTMLelementClassName){
        document.querySelector(HTMLelementClassName).innerHTML = ``;
    }

    removePreviousCursor(wordObject, theIndex) {
        if (theIndex > 0){
            const charObject = wordObject.children[theIndex - 1];
            charObject.classList.remove(`cursor-after`);
        }else{
            const charObject = wordObject.children[theIndex];
            charObject.classList.remove(`cursor-before`);
        }
    }

    addNewCursor(wordObject, childIndex, nameOfClass){
        wordObject.children[childIndex].classList.add(nameOfClass);
    }


// event handler functions

    handleKeyDownEvent(event){
        this.currentWord = this.allWords[this.currentWordIndex]
        this.lastTypedChar = this.allWords[this.currentWordIndex].children[this.currentCharIndex - 1]
        this.currentWordChildren = this.allWords[this.currentWordIndex].children
        this.currentCharacter = this.currentWord.children[this.currentCharIndex];

        if(!this.isTestRunning){
            this.startTimer()
            this.isTestRunning = true;
        }

        if (event.code == `Space`) {
            this.handleSpaceMove();
        }else if(event.code == `Backspace`){
            this.undoMove();
        }else if(this.currentCharIndex < this.currentWord.children.length && event.location == 0 && !this.specialKeys.includes(event.key)) {
            this.moveByOneCharacter(event);
        }else if(event.location == 0 && !this.specialKeys.includes(event.key)){
            this.addExcessCharacter(event);
        }else if(event.key == `Enter`){
            this.InternalRestartSameTest();
        }else if(event.key == `Escape`){
            this.InternalStartNewTest();
        }
    }

    handleResize(){
        const NewDivWidth = document.querySelector(this.wordContainerClassName).offsetWidth;
        if (this.currentWordIndex > 0 && NewDivWidth !== this.divWidth){
            const allWordsArray = Array.from(this.allWords);
            const typedWords = allWordsArray.slice(0, this.currentWordIndex);
            this.updateFinalCharScore(typedWords)
            this.removeHTMLelementArray(typedWords)
            this.currentWordIndex = 0;
            this.addMoreWords(typedWords.length)
        }
    }

    handleSpaceMove(){
        let evaluationResult = this.evaluateWordClassName(this.currentWordChildren);
        if(evaluationResult){
            this.removePreviousCursor(this.currentWord, this.currentCharIndex);
            this.currentWord.className = evaluationResult;
            if(this.isLastElementOnNewRow()){
                const topRowElements = this.getTopRowElements()
                this.updateFinalCharScore(topRowElements)
                this.removeHTMLelementArray(topRowElements)
                this.currentWordIndex = this.currentWordIndex - (topRowElements.length - 1)
                this.addMoreWords(topRowElements.length)
            }else{
                this.currentWordIndex++;
            }
            this.currentCharIndex = 0;
            this.addNewCursor(this.allWords[this.currentWordIndex], 0, `cursor-before`);
        }else{console.log(`\"You shall not pass!\" - Gandalf`)}
    }

    undoMove(){
        // to remove excess character
        if(this.currentCharIndex > 0 && this.lastTypedChar.classList.contains(`excess-char`)){
            this.lastTypedChar.remove();
            this.currentCharIndex --;
            this.addNewCursor(this.currentWord, (this.currentCharIndex - 1), `cursor-after`);
        // to return to previous word
        }else if(this.currentCharIndex === 0 && this.currentWordIndex > 0 && this.allWords[(this.currentWordIndex - 1)].className !== `correct-word`){
            this.removePreviousCursor(this.currentWord, this.currentCharIndex);
            this.currentWord.className = `word`;
            this.currentWordIndex--;
            this.currentCharIndex = this.findFirstEmptyCharIndex(this.allWords[this.currentWordIndex].children, `char`);
            this.addNewCursor(this.allWords[this.currentWordIndex], (this.currentCharIndex - 1), `cursor-after`);
        // to remove regular character
        }else if(this.currentCharIndex > 0){
            this.currentCharIndex--;
            this.lastTypedChar.className = `char`;
            const newIndex = this.currentCharIndex > 0 ? this.currentCharIndex - 1 : this.currentCharIndex;
            const cursorClass = this.currentCharIndex > 0 ? `cursor-after` : `cursor-before`;
            this.addNewCursor(this.currentWord, newIndex, cursorClass);
        }
    }

    moveByOneCharacter(event){
        this.removePreviousCursor(this.currentWord, this.currentCharIndex);
        const evaluationResult = this.evaluateCharClassName(this.currentCharacter, event.key)
        evaluationResult ==  `correct-char` ? this.allTypedCorrectChars++ : this.allTypedWrongChars++;
        this.currentCharacter.className = evaluationResult;
        this.addNewCursor(this.currentWord, this.currentCharIndex, `cursor-after`);
        this.currentCharIndex++;
    }

    addExcessCharacter(event){
        this.removePreviousCursor(this.currentWord, this.currentCharIndex);
        const excessChar = document.createElement('span');
        excessChar.textContent = event.key;
        excessChar.className = `excess-char`;
        this.allTypedexcessChars++;
        excessChar.classList.add(`cursor-after`); //...addNewCursor
        this.currentWord.appendChild(excessChar);
        this.currentCharIndex++;
    }


// helper functions

    evaluateCharClassName(currentChar, pressedKey) {
        return currentChar.innerText === pressedKey ? `correct-char` : `wrong-char`;
    }

    evaluateWordClassName(nodeArray){
        const letters = Array.from(nodeArray)
        if (letters.every((item) => item.classList.contains(`char`))){
            return false;
        }else if(letters.some((item) => item.classList.contains(`wrong-char`) || item.classList.contains(`excess-char`) || item.classList.contains(`char`))){
            return `wrong-word`;
        }else{
            return `correct-word`;
        }
    }

    findFirstEmptyCharIndex(nodeList, charclass){
        let charIndex = nodeList.length;
        for (const [index, span] of Array.from(nodeList).entries()) {
            if (span.className === charclass) {
                charIndex = index;
                break;
            }
        }
        return charIndex;
    }

    isLastElementOnNewRow() {
        const firstRowoffsetTop = this.allWords[0].offsetTop;
        const currentWordOffsetLeft = this.allWords[this.currentWordIndex].offsetLeft;
        const currentWordOffsetTop = this.allWords[this.currentWordIndex].offsetTop;
        const nextWordOffsetLeft = this.allWords[this.currentWordIndex + 1].offsetLeft;
        return (currentWordOffsetTop > firstRowoffsetTop && nextWordOffsetLeft < currentWordOffsetLeft);
    }

    getTopRowElements() {
        const defaultoffsetTop = this.allWords[0].offsetTop;
        const topRowWords = [];

        for (let i = 0; i < this.allWords.length ; i++){
            if(this.allWords[i].offsetTop > defaultoffsetTop){
                break
            }else{
                topRowWords.push(this.allWords[i])
            }
        }
        return Array.from(topRowWords)
    }

    updateFinalCharScore(elementArray){
        for (let i = 0; i < elementArray.length; i++){
            for (let j = 0; j < elementArray[i].children.length; j++){
                if(elementArray[i].children[j].classList.contains(`correct-char`)){
                    this.correctChars++
                }else if(elementArray[i].children[j].classList.contains(`wrong-char`)){
                    this.wrongChars++
                }else if(elementArray[i].children[j].classList.contains(`char`)){
                    this.missedChars++
                }else if(elementArray[i].children[j].classList.contains(`excess-char`)){
                    this.excessChars++
                }
            }
        }
    }


// timer functions

    startTimer() {
        this.timerId = setInterval(() => {
            this.currentTime--;
            if (this.currentTime <= 0) {
                this.updateTimerElement();
                this.stopTimer();
                this.stopTest();
            } else {
                this.updateTimerElement();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerId);
        this.timerId = null;
    }

    restartTimer() {
        this.stopTimer();
        this.currentTime = this.testDuration;
        this.updateTimerElement();
        this.startTimer();
    }

    updateTimerElement() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const element = document.querySelector(this.TimerclassName);
        if (element) {
            element.textContent = formattedTime;
        }
    }

// data fetching functions
    async addMoreWords(amount) {
        const newWords = await this.getAsyncWordsFunction(amount, this.textFormat);
        this.wordsList = this.wordsList.concat(newWords);
        this.addWordsToHTML(newWords, this.wordContainerClassName);
        this.wordContainer = document.querySelectorAll(this.wordContainerClassName);
        this.allWords = this.wordContainer[0].children;
    }
}