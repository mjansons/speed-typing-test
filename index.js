import getWords from "./api.js";

function addWordsToHTML(wordList) {
    let container = document.querySelector('.words');

    wordList.forEach((word) => {
        let wordElement = document.createElement('div');
        wordElement.className = 'word';

        word.split('').forEach((char) => {
            let span = document.createElement('span');
            span.textContent = char;
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

// Initialize variables
let currentWordIndex = 0;
let currentCharIndex = 0;


let allWords = document.querySelectorAll(`.word`)
let allChars = allWords[currentWordIndex].children;


// Function to move to the next character or word
function moveToNextChar(character) {
    // If the current character matches the pressed key, move to the next character
    if (allWords[currentWordIndex].children[currentCharIndex].textContent === character) {
        allChars = allWords[currentWordIndex].children;
        allChars[currentCharIndex].classList.add(`correct`)
        currentCharIndex++;
    }else{
        allChars = allWords[currentWordIndex].children;
        allChars[currentCharIndex].classList.add(`wrong`)
        currentCharIndex++;
    }
}

// Listen for keydown events
document.addEventListener('keydown', function(event) {
    if (event.code === `Space`) {
        currentWordIndex++;
        currentCharIndex = 0;
    }else if(event.code === `Backspace`){
        console.log(`Before backspace Char Index: ${currentCharIndex}`)

        if(currentCharIndex === 0){
            // allow to move back if word index is more than 0 AND
            // if previous word char classes contain at least one wrong
            // then I will make current word index -- and
            // set char index to last child and take class away
        }
        if(allWords[currentWordIndex])
        // if char has class excess:
            // remove char
            // char index -1
        // if char index is < 0:
            // then char index -1


        currentCharIndex--
        allChars[currentCharIndex].className = ``;


        console.log(`After backspace Char Index: ${currentCharIndex}`)
    }else if(currentCharIndex < allWords[currentWordIndex].children.length) {
        moveToNextChar(event.key);
    }else{
        // excess character adding
        let excessChar = document.createElement('span');
        excessChar.textContent = event.key;
        allWords[currentWordIndex].appendChild(excessChar);
        allChars[currentCharIndex].classList.add(`excess`)
        currentCharIndex++;

    }
});



// this tracks window resizing
// window.addEventListener(`resize`, function(){
//     const divWidth = document.querySelector(`.container`).offsetWidth;
//     console.log(divWidth);
// })



// BACKSPACE LOGIC:
    // if char index is 0;
        // allow to move back if word index is more than 0 AND
        // if previous word char classes contain at least one wrong
        // then I will make current word index -- and
        // set char index to last child and take class away
    // if char has class excess:
        // remove char
        // char index -1
    // if char index is < 0:
        // then char index -1