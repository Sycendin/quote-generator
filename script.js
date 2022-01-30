// Set quotes from api to empty array at start
let apiQuotes = [];

// Select quote container 
const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterButton = document.querySelector('#twitter')
const newQuoteButton = document.querySelector('#new-quote')
const loader = document.querySelector('#loader')
const loaderText = document.querySelector('#loading-text')

const showLoadingSpinner = () =>{
    loader.hidden = false;
    loaderText.hidden = false;
    quoteContainer.hidden = true;
}
const removeLoadingSpinner = () =>{
    loader.hidden = true;
    loaderText.hidden = true;
    quoteContainer.hidden = false;
}
//Generate new quote
const generateQuote = () =>{
        showLoadingSpinner()
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        if (quote.author === null){
            authorText.textContent = 'Unkown'    
        }
        else{
            authorText.textContent = quote.author
        }
        if (quote.text.length > 100){
            quoteText.classList.add('long-quote')
        }
        else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.textContent = quote.text
        removeLoadingSpinner()

}
const getQuoteFromAPI = async () =>  {
    showLoadingSpinner()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        generateQuote();
    }
    catch (error){
        throw new Error('Error getting quotes from api')
    }
}

//Tweet quote
const tweetQuote =() =>{
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} -  ${authorText.textContent}`;
    // Open url in a new tab
    window.open(twitterUrl, '_blank');
}

//Event listeners for buttons
newQuoteButton.addEventListener('click', generateQuote)
twitterButton.addEventListener('click', tweetQuote)

getQuoteFromAPI();
