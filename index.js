async function getAllAuthors(){
    try{
        const response = await fetch(`https://poetrydb.org/author`);
        const data = await response.json();
        if ([`404`, `405`, 404, 405].includes(data.status)){
            console.log(data.reason)
        }else{
            return data.authors
        }
    }catch(error) {
        console.log(`Fetch Error,`, error)
    }
}

async function getFirstAuthorPoem(authorName){
    try{
        const response = await fetch(`https://poetrydb.org/author/${authorName}`);
        const data = await response.json();
        if ([`404`, `405`, 404, 405].includes(data.status)){
            console.log(data.reason)
        }else{
            return data[0].lines
        }
    }catch(error) {
        console.log(`Fetch Error,`, error)
    }
}

function selectRandom(array){
    return array[Math.floor(Math.random() * array.length)]
}

async function getRandomPoem(){
    const authorList = await getAllAuthors()
    const authorName = selectRandom(authorList)
    const randomPoem = await getFirstAuthorPoem(authorName)
    console.log(randomPoem)
}

getRandomPoem()

// const authorName = selectRandom(authorList)
// const randomPoem = getFirstAuthorPoem(authorName)

