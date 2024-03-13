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
const SpecialKeys= [`CapsLock`, `Tab`, `Enter`];
let currentWordIndex = 0;
let currentCharIndex = 0; // this could be cursor location
let allWords = document.querySelectorAll(`.word`)
// set first cursor
allWords[0].children[0].classList.add('cursor-before');

document.addEventListener('keydown', function(event) {
    let currentWord = allWords[currentWordIndex]
    let currentCharacter = currentWord.children[currentCharIndex];
    let lastTypedChar = allWords[currentWordIndex].children[currentCharIndex - 1]
    let currentWordChildren = allWords[currentWordIndex].children

    if (event.code == `Space`) {
        let evaluationResult = evaluateWord(currentWordChildren);
        if(evaluationResult){
            removePreviousCursor(currentWord, currentCharIndex);
            currentWord.className = evaluationResult;
            currentWordIndex++;
            currentCharIndex = 0;
            allWords[currentWordIndex].children[0].classList.add(`cursor-before`);
        }else{console.log(`\"You shall not pass!\" - Gandalf`)}

    }else if(event.code == `Backspace`){
        // to remove excess character
        if(currentCharIndex > 0 && lastTypedChar.classList.contains(`excess-char`)){
            lastTypedChar.remove();
            currentCharIndex --;
        // to return to previous word
        }else if(currentCharIndex === 0 && currentWordIndex > 0 && allWords[(currentWordIndex - 1)].className !== `correct-word`){
            currentWord.className = `word`;
            currentWordIndex--;
            currentCharIndex = findFirstEmptyCharIndex(allWords[currentWordIndex].children, `char`)
        // to remove regular character
        }else if(currentCharIndex > 0){
            currentCharIndex--;
            lastTypedChar.className = `char`;
        }
    }else if(currentCharIndex < currentWord.children.length && event.location == 0 && !SpecialKeys.includes(event.key)) {
    // to move to the next character
        removePreviousCursor(currentWord, currentCharIndex);
        currentCharacter.className = evaluateCharacter(currentCharacter, event.key);
        currentCharacter.classList.add(`cursor-after`)
        currentCharIndex++;

    }else if(event.location == 0 && !SpecialKeys.includes(event.key)){
    // to add an excess character
        removePreviousCursor(currentWord, currentCharIndex);
        let excessChar = document.createElement('span');
        excessChar.textContent = event.key;
        excessChar.className = `excess-char`;
        excessChar.classList.add(`cursor-after`);
        currentWord.appendChild(excessChar);
        currentCharIndex++;
    }
});


function evaluateCharacter(currentChar, pressedKey) {
    return currentChar.innerText === pressedKey ? `correct-char` : `wrong-char`;
}

function evaluateWord(nodeArray){
    const letters = Array.from(nodeArray)
    if (letters.every((item) => item.classList.contains(`char`))){
        return false
    }else if(letters.some((item) => item.classList.contains(`wrong-char`) || item.classList.contains(`excess-char`) || item.classList.contains(`char`))){
        return `wrong-word`
    }else{
        return `correct-word`
    }
}

function findFirstEmptyCharIndex(nodeList, charclass) {
    let charIndex = nodeList.length;
    for (const [index, span] of Array.from(nodeList).entries()) {
        if (span.className === charclass) {
            charIndex = index;
            break;
        }
    }
    return charIndex;
}

function removePreviousCursor(wordObject, theIndex) {
    if (theIndex > 0){
        const charObject = wordObject.children[theIndex - 1];
        charObject.classList.remove(`cursor-after`);
    }
   }

// this tracks window resizing
// window.addEventListener(`resize`, function(){
//     const divWidth = document.querySelector(`.container`).offsetWidth;
//     console.log(divWidth);
// })

