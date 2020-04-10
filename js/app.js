const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
    .then( checkStatus )
    .then(res => res.json())
    .catch(error => console.log('Looks like there was a problem', error));
}

Promise.all([
  fetchData("https://dog.ceo/api/breeds/list"),
  fetchData("https://dog.ceo/api/breeds/image/random")
])
.then( data => {
      const breedList = data[0].message;
      const randomUmage = data[1].message;
      
      putInSelect(breedList);
      generateImage(randomUmage);
});

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

function checkStatus(response){
  if ( response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject( new Error(response.statusText));
  }

}

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

