import getWords from "./api.js";


class SpeedTypingTest{
    constructor(container, caseSensitivity = false) {
        this.isTestRunning = false;
        this.specialKeys = [`CapsLock`, `Tab`, `Enter`];
        this.container = container;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.caseSensitivity = caseSensitivity
    }

    async startTest(getAsyncWordsFunction) {
        if (!this.isTestRunning) {
            this.wordsList = await getAsyncWordsFunction(50, this.caseSensitivity);
            this.addWordsToHTML(this.wordsList, this.container);
            this.wordContainer = document.querySelectorAll(this.container);
            this.allWords = this.wordContainer[0].children;
            this.addNewCursor(this.allWords[0], 0, `cursor-before`);
            this.addTestEventListeners();
            this.isTestRunning = true;
        }
    }

    restartTest() {
        this.stopTest();
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isTestRunning = false;
        this.startTest();
    }

    stopTest() {
        if (this.isTestRunning) {
            this.removeTestEventListeners();
            this.isTestRunning = false;
            // Optionally: Reset test UI elements (clear classes, etc.)
        }
    }

    addTestEventListeners(){
        document.addEventListener('keydown', this.handleKeyDownEvent.bind(this));
    }

    removeTestEventListeners(){
        document.removeEventListener('keydown', this.handleKeyDownEvent.bind(this));
    }

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

    handleKeyDownEvent(event){
        this.currentWord = this.allWords[this.currentWordIndex]
        this.currentCharacter = this.currentWord.children[this.currentCharIndex];
        this.lastTypedChar = this.allWords[this.currentWordIndex].children[this.currentCharIndex - 1]
        this.currentWordChildren = this.allWords[this.currentWordIndex].children

        if (event.code == `Space`) {
            this.handleSpaceMove();
        }else if(event.code == `Backspace`){
            this.undoMove();
        }else if(this.currentCharIndex < this.currentWord.children.length && event.location == 0 && !this.specialKeys.includes(event.key)) {
            this.moveByOneCharacter(event);
        }else if(event.location == 0 && !this.specialKeys.includes(event.key)){
            this.addExcessCharacter(event);
        }
    }

    handleSpaceMove(){
        let evaluationResult = this.evaluateWord(this.currentWordChildren);
        if(evaluationResult){
            this.removePreviousCursor(this.currentWord, this.currentCharIndex);
            this.currentWord.className = evaluationResult;
            console.log(this.areChildrenLongerThanParent())
            this.currentWordIndex++;
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
        this.currentCharacter.className = this.evaluateCharacter(this.currentCharacter, event.key);
        this.addNewCursor(this.currentWord, this.currentCharIndex, `cursor-after`);
        this.currentCharIndex++;
    }

    addExcessCharacter(event){
        this.removePreviousCursor(this.currentWord, this.currentCharIndex);
        const excessChar = document.createElement('span');
        excessChar.textContent = event.key;
        excessChar.className = `excess-char`;
        excessChar.classList.add(`cursor-after`); //...addNewCursor
        this.currentWord.appendChild(excessChar);
        this.currentCharIndex++;
    }

    evaluateCharacter(currentChar, pressedKey) {
        return currentChar.innerText === pressedKey ? `correct-char` : `wrong-char`;
    }

    evaluateWord(nodeArray){
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


    areChildrenLongerThanParent() {
        const parentLength = this.wordContainer[0].offsetWidth;
        console.log(`Parent length: ${parentLength}`)
        // console.log(this.wordContainer)

        let childrenWidth = 0;
        for (let i = 0; i <= this.currentWordIndex; i++) {
            childrenWidth = childrenWidth + this.allWords[i].offsetWidth;
        }
        console.log(`Total Children length: ${childrenWidth}`)
        return childrenWidth > parentLength;
    }




    // when space is pressed
        // (get the length of the parent div * 2)
        // get the length of all words until (current word)
        // if all are more than (parent div * 2),
            // update scoring somehow / or pass the words, should the score be already updated up until that point?
            // remove all the words until the current word

}




function fakeWordFunction(){
    return ["apple", "banana", "orange", "pear", "grape", "pineapple", "kiwi", "watermelon", "strawberry", "blueberry","apple", "banana", "orange", "pear", "grape", "pineapple", "kiwi", "watermelon", "strawberry", "blueberry", "apple", "banana", "orange", "pear", "grape", "pineapple", "kiwi", "watermelon", "strawberry", "blueberry","apple", "banana", "orange", "pear", "grape", "pineapple", "kiwi", "watermelon", "strawberry", "blueberry"];
}

// const testInstance = new SpeedTypingTest(`.words`, true);
// testInstance.startTest(fakeWordFunction);

// console.log(testInstance.allWords)


async function runTest() {
    const testInstance = new SpeedTypingTest(`.words`, true);
    await testInstance.startTest(fakeWordFunction);
    // console.log(testInstance.areChildrenLongerThanParent())
}
runTest();
// testInstance.getElementLengthPX(



// this tracks window resizing
// window.addEventListener(`resize`, function(){
//     const divWidth = document.querySelector(`.container`).offsetWidth;
//     console.log(divWidth);
// })

