// grab the body element
// alert('hello world');

function getRandomPosition() {
  return `${Math.floor(Math.random() * 1000)}px`
}

const getRandomDog = async () => {
  const rawDog = await fetch('https://dog.ceo/api/breeds/image/random', {mode: 'cors'});
  const dogObj = await rawDog.json();
  return dogObj.message;
}

const image = chrome.runtime.getURL("./cat2.jpg");


function appendImage(dog) {
  const shameImage = document.createElement('img');
  shameImage.classList.add('image-of-shame');
//   console.log(image);
  shameImage.src = dog;
  shameImage.style.width = '10rem';
  shameImage.style.height = '10rem';
  shameImage.style.position = 'fixed';
  shameImage.style.top = getRandomPosition();
  shameImage.style.left = getRandomPosition();
  shameImage.style.zIndex = '2147483638';
  const randomDiv = document.querySelector('div');
  randomDiv.appendChild(shameImage)
}
/*

<img></img>


<div>
<img>
<div>message<div>

</div>

*/

function getDogAndAppend() {
  getRandomDog().then((dog) => appendImage(dog));
}

setInterval(getDogAndAppend, 3000)


/*
blacklist
- facebook
- twitter
- reddit
- bbc
- the atlantic

whitelist
- google
- stackoverflow
- csx
- github
- codesmith
*/