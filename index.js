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

async function doSomething(){
    const wordBank = await getWords(60, true)
    addWordsToHTML(wordBank)

}






// this tracks window resizing
// window.addEventListener(`resize`, function(){
//     const divWidth = document.querySelector(`.container`).offsetWidth;
//     console.log(divWidth);
// })



// TEST SPACE


// doSomething()


// this will allow me to find the current character
// questino tho, what happens when some words are removed?

// let cursorLocation = 0;
// let wordLoaction = 0;



// function getWordElement(charElement) {
//     return charElement.parentElement;
// }
// document.addEventListener(`keydown`, function(event){
//     if (event.key == allChars[cursorLocation].innerText){
//         allChars[cursorLocation].classList.add(`correct`);
//         cursorLocation ++;
//     }else{
//         allChars[cursorLocation].classList.add(`wrong`);
//         cursorLocation ++;
//     }

// })

const wordBank = ["apple", "banana", "orange", "pear", "grape", "pineapple", "kiwi", "watermelon", "strawberry", "blueberry","apple", "banana", "orange", "pear", "grape", "pineapple", "kiwi", "watermelon", "strawberry", "blueberry"];
addWordsToHTML(wordBank)

// Initialize variables
let currentWordIndex = 0;
let currentCharIndex = 0;

let allChars = document.querySelectorAll(`span`)
let allWords = document.querySelectorAll(`.word`)



async function addClassToSpan(className, charIndex){
    allChars[charIndex].classList.add(`${className}`);
}

// Function to move to the next character or word
function moveToNextChar(character) {
    // If the current character matches the pressed key, move to the next character
    if (allWords[currentWordIndex].children[currentCharIndex].textContent === character) {
        allChars = allWords[currentWordIndex].children;
        addClassToSpan(`correct`, currentCharIndex)
        currentCharIndex++;
        // If we've reached the end of the word, move to the next word
        if (currentCharIndex >= allWords[currentWordIndex].children.length) {
            console.log()
        }
    }else{
        addClassToSpan(`wrong`, currentCharIndex)
        currentCharIndex++;
        // If we've reached the end of the word, move to the next word
        if (currentCharIndex >= allWords[currentWordIndex].children.length) {
            console.log()
        }
    }
}

// Listen for keydown events
document.addEventListener('keydown', function(event) {
    console.log(event)
    console.log(`Char Index Before Button Press: ${currentCharIndex}`)
    console.log(`Word Index Before Button Press:${currentWordIndex}`)
    if (event.code === `Space`) {
        currentWordIndex++;
        currentCharIndex = 0;
        console.log(`SPACE Char Index After Button Press: ${currentCharIndex}`)
        console.log(`SPACE Word Index After Button Press: ${currentWordIndex}`)
    } else if(currentCharIndex < allWords[currentWordIndex].children.length) {
        moveToNextChar(event.key);
        console.log(`REG Char Index After Button Press: ${currentCharIndex}`)
        console.log(`REG Word Index After Button Press: ${currentWordIndex}`)
    }else{
        allWords[currentWordIndex]
        console.log(`cant be movin forwad`)
        let span = document.createElement('span');
        span.textContent = event.key;
        allWords[currentWordIndex].appendChild(span);
        addClassToSpan(`excess`, currentCharIndex)
        currentCharIndex++;
    }
});


// if a user presses space, I need to jump to the next word....


// add even listener for specific keystrokes
// if matching key pressed
    // update color to green
    // move to next letter
// else if not matching key pressed
    // update color to red
    // move to next letter

// if space is pressed
    // move to the next word


// if backspace pressed
    // change the current character class to regular
    // if current letter index > 0 and current word index is NOT 0
        // change current
    // move to previous letter




// list