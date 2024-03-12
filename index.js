import getWords from "./api.js";

function addWordsToHTML(wordList) {
    let container = document.querySelector('.words');

    wordList.forEach((word) => {
        let wordElement = document.createElement('div');
        wordElement.className = 'word';

        word.split('').forEach((char) => {
            let span = document.createElement('span');
            span.textContent = char;
            span.className = `char`;
            wordElement.appendChild(span);
        });

        container.appendChild(wordElement);
    });
}

// attempt to write a main function for this module if it could be a module
async function doSomething(){
    const wordBank = await getWords(60, true)
    addWordsToHTML(wordBank)

}

// TEST:
const wordBank = ["apple", "banana", "orange", "pear", "grape", "pineapple", "kiwi", "watermelon", "strawberry", "blueberry","apple", "banana", "orange", "pear", "grape", "pineapple", "kiwi", "watermelon", "strawberry", "blueberry"];
addWordsToHTML(wordBank)

// Initial variables
let currentWordIndex = 0;
let currentCharIndex = 0; // this could be cursor location
let allWords = document.querySelectorAll(`.word`)

document.addEventListener('keydown', function(event) {
    let currentWord = allWords[currentWordIndex]
    let lastTypedChar = allWords[currentWordIndex].children[currentCharIndex - 1]
    let currentWordChildren = allWords[currentWordIndex].children

    if (event.code == `Space`) {
        let evaluationResult = evaluateWord(currentWordChildren);
        if(evaluationResult){
            currentWord.className = evaluationResult;
            currentWordIndex++;
            currentCharIndex = 0;
        }else{
            console.log(`\"You shall not pass!\" - Gandalf`)
        }

    }else if(event.code == `Backspace`){
        let previousChar = currentWord.children[(currentCharIndex - 1)]
        // to remove excess character
        if(currentCharIndex > 0 && previousChar.className == `excess-char`){
            currentWord.children[(currentCharIndex - 1)].remove();
            currentCharIndex --;
        // to return to previous word
        }else if(currentCharIndex === 0 && currentWordIndex > 0 && allWords[(currentWordIndex - 1)].className !== `correct-word`){
            currentWord.className = `word`;
            currentWordIndex--;
            currentCharIndex = findLastCharIndex(allWords[currentWordIndex].children, `char`)
        // to remove regular character
        }else if(currentCharIndex > 0){
            currentCharIndex--;
            lastTypedChar.className = `char`;
        }
    }else if(currentCharIndex < currentWord.children.length && event.location == 0 && event.key != `CapsLock` && event.key != `Tab`) {
    // to move to the next character
        let currentCharacter = currentWord.children[currentCharIndex];
        currentCharacter.className = evaluateCharacter(currentCharacter, event.key);
        currentCharIndex++;
    }else if(event.location == 0 && event.key != `CapsLock` && event.key != `Tab`){
    // to add an excess character
        let excessChar = document.createElement('span');
        excessChar.textContent = event.key;
        excessChar.className = `excess-char`;
        allWords[currentWordIndex].appendChild(excessChar);
        currentCharIndex++;
    }
});

function evaluateCharacter(currentChar, pressedKey) {
    return currentChar.innerText === pressedKey ? `correct-char` : `wrong-char`;
}

function evaluateWord(nodeArray){
    const letters = Array.from(nodeArray)
    if (letters.every((item) => item.className == `char`)){
        return false
    }else if(letters.some((item) => item.className == `wrong-char` || item.className == `excess-char` || item.className == `char`)){
        return `wrong-word`
    }else{
        return `correct-word`
    }
}

function findLastCharIndex(nodeList, charclass) {
    let charIndex = nodeList.length;
    for (const [index, span] of Array.from(nodeList).entries()) {
        if (span.className === charclass) {
            charIndex = index;
            break;
        }
    }
    return charIndex;
}


// this tracks window resizing
// window.addEventListener(`resize`, function(){
//     const divWidth = document.querySelector(`.container`).offsetWidth;
//     console.log(divWidth);
// })

