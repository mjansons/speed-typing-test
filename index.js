import getWords from "./api.js";

console.log(getWords(150, true))

function addWordsToHTML(sentence,){
    let container = document.querySelector('.words');
    let currentWord = document.createElement('div');
    currentWord.className = 'word';

    sentence.forEach((char, index) => {
        if (char === ' ') {
            container.appendChild(currentWord);
            currentWord = document.createElement('div');
            currentWord.className = 'word';
        } else {
            let span = document.createElement('span');
            span.textContent = char;
            currentWord.appendChild(span);
        }
        if (index === sentence.length - 1) {
            container.appendChild(currentWord);
        }
    });
}



// this tracks window resizing
// window.addEventListener(`resize`, function(){
//     const divWidth = document.querySelector(`.container`).offsetWidth;
//     console.log(divWidth);
// })



// TEST SPACE

// let someWords = ['w', 'h', 'i', 'l', 'e', ' ', 'o', 'n', ' ', 'm', 'y', ' ', 'l', 'o', 'n', 'e', 'l', 'y', ' ', 'c', 'o', 'u', 'c', 'h', ' ', 'i', ' ', 'l', 'i', 'e', ' ', 'i', ' ', 's', 'e', 'l', 'd', 'o', 'm', ' ', 'f', 'e', 'e', 'l', ' ', 'm', 'y', 's', 'e', 'l', 'f', ' ', 'a', 'l', 'o', 'n', 'e', ' ', 'f', 'o', 'r', ' ', 'f', 'a', 'n', 'c', 'y', ' ', 'f', 'i', 'l', 'l', 's', ' ', 'm', 'y', ' ', 'd', 'r', 'e', 'a', 'm', 'i', 'n', 'g', ' ', 'e', 'y', 'e', ' ', 'w', 'i', 't', 'h', ' ', 's', 'c', 'e', 'n', 'e']
// addWordsToHTML(someWords)