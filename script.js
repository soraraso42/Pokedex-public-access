
const $library = document.getElementById('pokemon-library');
const $load = document.getElementById('load');
const $list = document.getElementById('pokemon-list');
let $next = ""; //store the next url
// test out API first 
// https://pokeapi.co/api/v2/Pokemon/?offset=20&limit=20
const test = fetch("https://pokeapi.co/api/v2/berry/?/offset=20&limit=20")
.then(response=>response.json())
.then(data=>{displayPokemon(data.results);
    $next = data.next;
    $load.addEventListener('click', function(e){
    e.preventDefault();
    // console.log("load button is clicked");
    // next url is contained in the response 
    const nextBatch = fetch($next) // DONE store and update this parameter 
    .then(response =>response.json())
    .then(data=>{displayPokemon(data.results);

        $next = data.next; // update the next url
    }); // DONE repeatedly load more
})})

.catch(error => console.error('Error fetching data:', error)); // give error feedback 


// a promise in pending state, looks like an iterable (lazy in Py)
// the above line load json data in console for 20 pokemons
// DONE // with json data, parse url
// DONE // with parsed url, get sprites 
// reading results from a promise returned by API :https://www.freecodecamp.org/news/the-javascript-promises-handbook

// emulate react framework with custom function from lecture 
function createElement(type,props,...children){
    const $el = document.createElement(type);
    // props is a js object 
    // go over each k:v pair with for...in...
    for (const prop in props){
        $el[prop]= props[prop];
    }
    $el.append(...children)
    return $el;
};




// DONE create a display for 20 pokemons from input array of pokemon objects 
function displayPokemon(input)   {
    for (let p of input){
        // pokemon face 
        const $sprite = createElement('img', {
            className: 'pokemon-sprite',
            src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseUrl(p.url)}.png` ,
            alt: p.name // improve accessibility
        
        });// insert smaller thumbnail according to pokemon id
        $sprite.classList.add('figure-img','img-fluid' ,'rounded' )
        // pokemon name 
        const $name = createElement('caption', {className:'pokemon-name'}, p.name);
        $name.classList.add('text-center','figure-caption')
        // put face and pokemon in display box 
        const $box = createElement('figure', {className :'pokemon-box'}, $sprite, $name);
        // add id of pokemon to box 
        $box.classList.add(parseUrl(p.url), 'col-6', 'col-md-4', 'col-lg-3', 'justify-content-center', 'align-content-center','figure');
        // add box to library 
        $library.append($box);
        // console.log("one pokemon added")

    }
};

// dynamic for counts of pokemon    // dynamic for screensize 





// TODO// show detail

// parsing pokemon id from url 
// Will return the Pokemon's id from the provided url
function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
  }
// listen for click event using event delegation 
$library.addEventListener('click',function(e){
    e.preventDefault()
    if (e.target.classList.contains('pokemon-box')){
        // grab id of clicked pokemon
        const id = parseUrl(e.target.classList[1]) // put 
        // fetch sprite?
    }
})
// fetch detail info (from pokemon and sprite)
// display detail info
    // TODO// inside which 
    // catch/release a pokemon 
        // show catch/ release button with toggle 
        // store caught/removed status to local storage 


// TODO// myPokemon list showing caught/removed/released pokemon 
// // retrieve list from local storage
// // display list 
// // add remove function (adapt from todoList)
// function caughtList(ls){
//     pass
// }

