const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetch("https://dog.ceo/api/breeds/list")
  .then( response => response.json())
  //.then( data => console.log(data.message))
  .then( data => putInSelect(data.message));

fetch("https://dog.ceo/api/breeds/image/random")
  .then( response => response.json())
  .then( data => generateImage(data.message));


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateImage(url){
  var img = document.createElement("img");
  img.src = url;
  //console.log(img);
  var p = document.createElement("p");
  p.innerHTML = "Click to view images of ...";
  var card = document.getElementsByClassName("card")[0];
  card.appendChild(img);
  card.appendChild(p);
}
//var img = 'https://images.dog.ceo/breeds/malinois/n02105162_2836.jpg';

function putInSelect(breeds){r
  document.getElementById("breeds").innerHTML = breeds.map( breed => `<option value="${breed}">${breed}</option>` );
//  <option value="volvo">Volvo</option>

}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  POST DATA
// ------------------------------------------

