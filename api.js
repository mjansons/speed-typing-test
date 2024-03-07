// this is the master function
export default async function getWordArrayFromAPI(n, normalize = false){
    let words = [];
    while(words.length < n){
        const authorList = await getAllAuthors()
        // const authorList = [`Anne Bronte`, `Mark Twain`]
        const authorName = selectRandom(authorList);
        let arrayOfLines = await getPoem(authorName);

        let stringOfLines = formatText(arrayOfLines);
        if (normalize){
            stringOfLines = normalizeText(stringOfLines);
        }

        let arrayOfWords = stringOfLines.split(` `);
        let firstWords = extractFirstWords((n - words.length), arrayOfWords)
        words = words.concat(firstWords)
    }
    return words;
}

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

function formatText(array) {
    return array
        .filter((line) => line !== '')
        .map((filteredLine) => filteredLine.trim())
        .join(' ')
        .replace(/--/g, ' ')
        .replace(/  /g, ' ');
}
// remove punctuation, numbers, toLowerCase
function normalizeText(text) {
    const pattern = /[_\.,‘?!`~@#$%^&*()-=+[\]{}\\|;:'"<>\/0-9]/g;
    return text.replace(pattern, '').toLowerCase()
}

function extractFirstWords(n, wordArray){
    if (wordArray.length > n){
        return wordArray.slice(0, n);
    }else{
        return wordArray;
    }
}
