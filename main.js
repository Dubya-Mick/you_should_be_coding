/*
changes
  add approved url list to manifest file
  created quotes array and random quote generator
  changed 'getRandomPostion' to 'getRandomNumber'
  added 'interval' parameter to getRandomPosition
whitelist
  google
  stackoverflow
  csx
  github
  codesmith
backlog
  add supportive "doggo says: " quotes to images - eg, this looks fun, but isn't coding better?!?
  add option to add websites/domains to approved sites
  add option to change interval speed
  add options menu / add popout options menu
  add event listeners for when options munu is opened
names
  dogwatcher
  woffie
  bark
Image wrapper structure
<img></img>
<div>
<img>
<div>message<div>
</div>
*/


// find inspirational quote api
const quotesArray = [
  'This looks interesting, but what have you achieved today?', 
  'Woof! Is this going to help you live your best life?', 
  'Ruh roh! Is this the best use of your time on earth?',
  'Sure, this may be fun. But does it sbark joy?',
  'How is this going to help you grrrrrow?',
  'Maybe humans fail to value their time because they live so long :('
]
const interval = 5000;
const pageWidth = 1000;
const pageHeight = 1000;

// generate random quote
const getRandomQuote = (quotes) => {
  const numOfQuotes = quotes.length;
  const randomQuote= quotes[Math.floor(Math.random() * numOfQuotes)]
  return randomQuote;
}

// helper fucntion: generate random position 
// returns a random number for image to reference when appended
function getRandomPosition(num) {
  return `${Math.floor(Math.random() * num)}px`
}

// helper function: fetch dog image 
// returns dog image url as string
const getRandomDog = async () => {
  const rawDog = await fetch('https://dog.ceo/api/breeds/image/random', {mode: 'cors'});
  const dogObj = await rawDog.json();
  return dogObj.message;
}

// get image file from above URL
const image = chrome.runtime.getURL("./cat2.jpg");

// create, style, and append image to webpage
// pass in image to be used
function appendImage(dog) {

  const inspoContainer = document.createElement('div');
  inspoContainer.style.padding = '2rem';
  inspoContainer.style.boxShadow = '20px 20px 60px #afafaf, -20px -20px 60px #ffffff'
   // position image on page
   inspoContainer.style.position = 'fixed';
   inspoContainer.style.top = getRandomPosition(pageHeight);
   inspoContainer.style.left = getRandomPosition(pageWidth);
   inspoContainer.style.zIndex = '2147483638';
   inspoContainer.style.background = '#e0e0e0';
   inspoContainer.style.borderRadius = '10px';
   inspoContainer.style.maxWidth = '14rem';
   inspoContainer.style.wordWrap = 'break-word';
   inspoContainer.style.display = 'flex';
   inspoContainer.style.justifyContent = 'center';
   inspoContainer.style.alignItems = 'center';


  const quote = document.createElement('p');
  quote.textContent = getRandomQuote(quotesArray);
  quote.style.fontSize = '1.2rem';
  quote.style.textAlign = 'center';

  // create html image element to be appended to webpage
  const inspoImage = document.createElement('img');

  // assign name to class list 
  inspoImage.classList.add('image-of-shame');
  
  // add fetched image to image element
  inspoImage.src = dog;
  
  // size image 
  inspoImage.style.width = '10rem';
  inspoImage.style.height = '10rem';
  inspoImage.style.objectFit = 'cover';
  inspoImage.style.borderRadius = '10px';
  inspoImage.style.display = 'block';
  inspoImage.style.margin = '0 auto';
  
  const quoteAndImage = document.createElement('div');
  quoteAndImage.appendChild(inspoImage);
  quoteAndImage.appendChild(quote);

  // place everything in container
  inspoContainer.appendChild(quoteAndImage);
  
  // get first div element so the image ca be appended
  const randomDiv = document.querySelector('div');
  
  // append image to webpage
  randomDiv.appendChild(inspoContainer);
}

// fetch random dog image and append to image element
function getDogAndAppend() {
  getRandomDog().then((dog) => appendImage(dog));
}

// run get dog and append to page every 3000 milliseconds (3 seconds)
setInterval(getDogAndAppend, interval);