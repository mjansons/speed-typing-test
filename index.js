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

// Initialize variables
let currentWordIndex = 0;
let currentCharIndex = 0;


let allWords = document.querySelectorAll(`.word`)
let allChars = allWords[currentWordIndex].children;



// Listen for keydown events
document.addEventListener('keydown', function(event) {
    let currentWord = allWords[currentWordIndex]
    let currentChar = allWords[currentWordIndex].children[currentCharIndex]

    if (event.code === `Space`) {
        evaluateWord();
        currentWordIndex++;
        currentCharIndex = 0;
    }else if(event.code === `Backspace`){
        let previousChar = currentWord.children[(currentCharIndex - 1)]
        // if the fucking letter has a classname excess char!!!!
        // debugger
        if(currentCharIndex > 0 && previousChar.className == `excess-char`){
            currentWord.children[(currentCharIndex - 1)].remove();
            currentCharIndex --;
        }else if(currentCharIndex === 0 && currentWordIndex > 0 && allWords[(currentWordIndex - 1)].className !== `correct-word`){
            currentWordIndex--;
            currentCharIndex = (currentWord.children.length) - 1;
            currentChar.className = `char`;
        }else if(allWords[currentWordIndex][currentCharIndex]){

        }

        // if char has class excess:
            // remove char
            // char index -1
        else if(currentCharIndex > 0){
            console.log(`this was triggered`)
            currentCharIndex--
            allWords[currentWordIndex].children[currentCharIndex].className = `char`;
        }
            // then char index -1

    }else if(currentCharIndex < allWords[currentWordIndex].children.length) {
        moveToNextChar(event.key);
    }else{
        // excess character adding
        let excessChar = document.createElement('span');
        excessChar.textContent = event.key;

        allWords[currentWordIndex].appendChild(excessChar);
        allChars[currentCharIndex].className = `excess-char`
        currentCharIndex++;

    }
});

// Function to move to the next character or word
function moveToNextChar(character) {
    // if correct-char key pressed
    if (allWords[currentWordIndex].children[currentCharIndex].textContent === character) {
        allChars = allWords[currentWordIndex].children;
        allChars[currentCharIndex].className = `correct-char`
        currentCharIndex++;
    }else{
        allChars = allWords[currentWordIndex].children;
        allChars[currentCharIndex].className = `wrong-char`
        currentCharIndex++;
    }
}


function evaluateWord(){
    const letters = Array.from(allWords[currentWordIndex].children)
    if(letters.some((item) => item.className == `wrong-char` || item.className == `excess-char` || item.className == `char`)){
        allWords[currentWordIndex].className = `wrong-word`
    }else{
        allWords[currentWordIndex].className = `correct-word`
    }
}







// this tracks window resizing
// window.addEventListener(`resize`, function(){
//     const divWidth = document.querySelector(`.container`).offsetWidth;
//     console.log(divWidth);
// })



// BACKSPACE LOGIC:
    // if char index is 0;
        // allow to move back if word index is more than 0 AND
        // if previous word char classes contain at least one wrong-char
        // then I will make current word index -- and
        // set char index to last child and take class away
    // if char has class excess:
        // remove char
        // char index -1
    // if char index is < 0:
        // then char index -1
