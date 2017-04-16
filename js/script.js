const quotes = [];
const totalNumberOfQuotes = 30;
const apiUrl = `http://quotesondesign.com/wp-json/posts?filter[posts_per_page]=${totalNumberOfQuotes}&callback=`;

// constructs quote object with my own properties name insteadof what is return from the API
function Quote(data) {
  // remove the "<p>" "</p> " from the api content,
  // there's an empty space closing p tag 
  this.quote = data.content.slice(3, -5);
  this.source = data.title
}

// store quotes gotten from API into "quotes" after formating each quote object
function storeQuotes(data){
  data.forEach(quote => {
    quotes.push(new Quote(quote));
  });
}

function generateRandomNumber(upperLimit) {
  return Math.floor( Math.random() * upperLimit);
}

function getRandomQuote() {
  let randomIndex = generateRandomNumber(totalNumberOfQuotes);
  return quotes[randomIndex];
}

function printQuote() {
  let quoteText = `
    <p class="quote">${ getRandomQuote().quote }</p>
    <p class="source">${ getRandomQuote().source }</p>
  `;
  document.getElementById('quote-box').innerHTML  = quoteText;
  changeBackground();
}

function changeBackground() {
  const body = document.getElementsByTagName('body')[0];
  let red = generateRandomNumber(255);
  let green = generateRandomNumber(255);
  let blue = generateRandomNumber(255);

  body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}


// get quotes from api
$.getJSON(apiUrl, storeQuotes);

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
