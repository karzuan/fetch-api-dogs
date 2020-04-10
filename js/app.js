const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
    .then(res => res.json());
}

fetchData("https://dog.ceo/api/breeds/list")
  //.then( data => console.log(data.message))
  .then( data => putInSelect(data.message));

fetchData("https://dog.ceo/api/breeds/image/random")
  .then( data => generateImage(data.message));

//https://dog.ceo/api/breed/hound/images/random
function fetchBreedImage(){
  const breed = select.value;
  const img = card.querySelector("img");
  const p = card.querySelector("p");
  //https://dog.ceo/api/breed/hound/images/random
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      p.textContent = `Click to view more ${breed}s`;
    });
}
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateImage(data){
  
  const html = `
    <img src='${data}' alt>
    <p>Click to view image if ${select.value}s</p>
  `;
  card.innerHTML = html;
}
//var img = 'https://images.dog.ceo/breeds/malinois/n02105162_2836.jpg';

function putInSelect(breeds){
  select.innerHTML = breeds.map( breed => `<option value="${breed}">${breed}</option>` ).join('');
//  <option value="volvo">Volvo</option>
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

select.addEventListener('change', fetchBreedImage );
card.addEventListener('click', fetchBreedImage);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

