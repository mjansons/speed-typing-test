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

const punctuationMarks = [
    '`', '~', '!', '@', '#', '$', '%', '^', '&',
    '*', '(', ')', '-', '_', '=', '+', '[',
    ']', '{', '}', '\\', '|', '/', ';', ':', "'",
    '"', ',', '.', '<', '>', '/', '?'
  ];

function removePunctuation(string, removableCharList){
    let cleanCharacterList = [];
    for (let char of string){
        if(!removableCharList.includes(char)){
            cleanCharacterList.push(char);
        }
    }
    return cleanCharacterList
}

async function getRawText(){
    // const authorList = await getAllAuthors()
    const authorList = [`Anne Bronte`, `Edgar Allan Poe`]
    const authorName = selectRandom(authorList);
    console.log(authorName);
    let randomPoem = await getPoem(authorName);
    let toReturn = randomPoem.join(` `);
    toReturn = removePunctuation(toReturn, punctuationMarks)
    return toReturn
}



console.log(getRawText())

// this tracks window resizing
// window.addEventListener(`resize`, function(){
//     const divWidth = document.querySelector(`.container`).offsetWidth;
//     console.log(divWidth);
// })







// let currentWord = document.createElement('div');
// currentWord.className = 'word';

// // Select the specific div where you want to add the words
// let container = document.querySelector('.your-specific-class');

// sentence.forEach((char, index) => {
//     if (char === ' ') {
//         // Append the current word to the container and start a new word
//         container.appendChild(currentWord);
//         currentWord = document.createElement('div');
//         currentWord.className = 'word';
//     } else {
//         // Append the character to the current word
//         let span = document.createElement('span');
//         span.textContent = char;
//         currentWord.appendChild(span);
//     }

//     // If it's the last character, append the current word
//     if (index === sentence.length - 1) {
//         container.appendChild(currentWord);
//     }
// });



