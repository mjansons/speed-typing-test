   // this is a master function
async function getWordArray(n){
    let wordsToDisplay = [];
    do{
        // const authorList = await getAllAuthors()
        const authorList = [`Anne Bronte`, `Mark Twain`]
        const authorName = selectRandom(authorList);
        let randomPoem = await getPoem(authorName);

        // this could be a function
        randomPoem = removeLineBreaksAndTrim(randomPoem)
        randomPoem = randomPoem.join(` `).toLowerCase();
        randomPoem = removePunctuationAndNumbers(randomPoem);

        let arrayOfWords = randomPoem.split(` `);
        let { firstWords, remainingWords } = extractFirstWords(100, arrayOfWords)
        wordsToDisplay = wordsToDisplay.concat(firstWords)

    }while(wordsToDisplay.length < n)
    return wordsToDisplay;
}


console.log(getWordArray(600))


async function getAllAuthors(){
    try{
        const response = await fetch(`https://poetrydb.org/author`);
        const data = await response.json();
        if ([`404`, `405`, 404, 405].includes(data.status)){
            console.log(data.reason);
        }else{
            return data.authors;
        }
    }catch(error) {
        console.log(`Fetch Error,`, error);
    }
}

async function getPoem(authorName){
    try{
        const response = await fetch(`https://poetrydb.org/author/${authorName}`);
        const data = await response.json();
        // sometimes they return error as a string...
        if ([`404`, `405`, 404, 405].includes(data.status)){
            console.log(data.reason);
        }else{
            return data[0].lines;
        }
    }catch(error) {
        console.log(`Fetch Error,`, error);
    }
}

function selectRandom(array){
    return array[Math.floor(Math.random() * array.length)];
}

function removeLineBreaksAndTrim(array){
    return array.filter((line) => line != ``).map((filteredLine) => filteredLine.trim());
}

function removePunctuationAndNumbers(text) {
    text = text.replace(/--/g, ' ');
    const pattern = /[\.,?!`~@#$%^&*()-_=+[\]{}\\|;:'"<>/0-9]/g;
    const newText = text.replace(pattern, '');
    return newText;
   }

function extractFirstWords(n, wordArray){
    let firstWords = [];
    let remainingWords = [];
    if (wordArray.length > n){
        firstWords = wordArray.slice(0, n);
        remainingWords = wordArray.slice(n);
    }else{
        firstWords = wordArray;
        remainingWords = [];
    }
    return { firstWords, remainingWords };
}

// let kaka = [`one`,`two`,`three`,`four`]
// let { firstWords: stuf1, remainingWords:stuf2 } = extractFirstWords(9, kaka);
// console.log(stuf1, stuf2 )




function addWordsToHTML(sentence){
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