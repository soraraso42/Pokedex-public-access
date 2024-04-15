
const $library = document.getElementById('pokemon-library');
const $load = document.getElementById('load');
const $list = document.getElementById('pokemon-list');
// TODO local storage : data structure needs two kv pairs

let $next = localStorage.getItem('next') || ""; //store the next url
// stores data about pokemons on page until explicit clear 
// initiate a holder variable for on-page display
let tempArr = localStorage.getItem('gallery') ? JSON.parse(localStorage.getItem('gallery')) : [];


let caughtList =[];

// function to add an object from API to localArray // 20 objects inside
function save($json, tempArr){
    
    let json;
    // use concat 
    if (tempArr.length == 0){
        json = $json;
    }
    else{
        json = tempArr.concat($json);}
    // Create an array of UNIQUE objects
    
    jsonObject = json.map(JSON.stringify);
    uniqueSet = new Set(jsonObject);
    
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    console.log(uniqueArray); // correctly achieved 
    
    // put array of unique objects to localStorage
    localStorage.setItem('gallery',JSON.stringify(uniqueArray)); //correctly stored as a string 
}

// emulate react framework with custom function return an element
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


// return the Pokemon's id from the provided url
function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
  }

// create a display for 20 pokemons from input array of pokemon objects 
// and save input array to localStorage
function displayPokemon(input)   {
    // save gallery to localStorage 
    save(input, tempArr);
    for (let p of input){
        // pokemon face 
        const $sprite = createElement('img', {
            className: 'pokemon-sprite',
            src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseUrl(p.url)}.png` ,
            alt: ` thumbnail for ${p.name} `,// improve accessibility
        });// insert smaller thumbnail according to pokemon id
        $sprite.classList.add('figure-img','img-fluid' ,'rounded' ,'pokemon')
        // // add caught alert // default hidden with d-none
        const $caughtBanner = createElement('span',{className:'caught'},"CAUGHT")
        $caughtBanner.classList.add('d-none','position-absolute','top-0',  'start-100', 'translate-middle', 'badge', 'rounded-pill' ,'bg-danger','text-sm')
        const $spriteContainer = createElement('div', 
        {className:'spriteContainer',
        
        }, $sprite,$caughtBanner)
        $spriteContainer.classList.add('position-relative')
        // pokemon name 
        const $name = createElement('caption', {className:'pokemon-name'}, p.name);
        $name.classList.add('text-center','figure-caption','pokemon') // TODO text-center class is added but not taking effect 
        // put face and pokemon in display box 
        const $box = createElement('figure', {className :parseUrl(p.url), id:p.name}, $spriteContainer, $name); // ensure first element of classList is always id
        // because of the - in attribute names, cannot add directly with createElement()
        // $box.setAttribute('data-bs-toggle', 'modal'); // DEL this cause backdrop typeError 
        $box.setAttribute('data-bs-target', '#detailBox');
        $box.classList.add('pokemon-box', 'col-6', 'col-md-4', 'col-lg-3', 'justify-content-center', 'text-center','figure','pokemon');
       
        // add box to library 
        $library.append($box);
        // console.log(" pokemon added")

    }
};


// if tempArr is empty fetch from beginning
// else display from tempArr 
if (tempArr.length == 0)
    {fetch("https://pokeapi.co/api/v2/berry/?/offset=20&limit=20")
    .then(response=>response.json())
    // .then(data =>console.log(data))
    .then(data=>{
        displayPokemon(data.results);
        $next = data.next;
        console.log($next);
        // listen for user click on load more btn
        $load.addEventListener('click', function(e){
            e.preventDefault();
            // console.log("load button is clicked");
            // next url is contained in the response 
            const nextBatch = fetch($next) // DONE store and update this parameter 
            .then(response =>response.json())
            .then(data=>{displayPokemon(data.results);
            $next = data.next; // update the next url
            // store the updated url to localStorage 
            localStorage.setItem('next',$next)
            console.log(`updated next ${$next}`)
    }); // DONE repeatedly load more
})})

.catch(error => console.error('Error fetching data:', error))}
else{

    displayPokemon(tempArr);
    
    // listen for user click on load more btn
    $load.addEventListener('click', function(e){
        e.preventDefault();
        // console.log("load button is clicked");
        // next url is from local Storage
        $next = localStorage.getItem('next')
        const nextBatch = fetch($next) 
        .then(response =>response.json())
        .then(data=>{displayPokemon(data.results);
        $next = data.next; // update the next url
        localStorage.setItem('next',$next) // store updated value to localø
        console.log(`updated next ${$next}`)
}); // repeatedly load more
})
}


; // give error feedback 



// show detail
// use a card template from bootstrap and use modal to display 

// receives id and name returns a card-like element with larger image and 2 details 
function displayDetails(id, name){
    const $detailBody = createElement('div', {className:'card-body'});
    $detailBody.classList.add('text-center') ;
    const $detailBox = createElement('div', {className:'card', id:"detailBox"});
    const $lgSprite = createElement('img', {
        className: 'pokemon-sprite-lg',
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,    
    });
    $lgSprite.classList.add('img-card-center');
    // display pokeName as card title 
    const $detailName = createElement('p', {className:'card-title'},name);
    $detailName.classList.add('h3','text-center');
    
    // retrieve and display details with async
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) // this returns a promise
    .then(response => response.json())
    // display base experience score and species 
        /* .then(id => { console.log(id) })// this gives undefined because the parameters contained in the parsed json data need to be handled inside this function
        // FIXED this data is not retrieved 
        // const $species = createElement('p',{className: 'card-text'}, `species: ${species.name}`) ;
        / $detailBody.append($species);    */
    .then(data => { //console.log(data) // was returning undefined when prev line is console.log(response.json()) because the data parsed can be understood to be already passed to console.log() func
        $species = createElement('p',{className: 'card-text'}, `species: ${data.species.name}`) ;
        $experience = createElement('p',{className: 'card-text'}, `base experience: ${data.base_experience}`);
        // console.log($species)
        $detailBody.append($species);
        $detailBody.append($experience);
        console.log($detailBody)

    })
    //  add toggle and initial text that is based on pokemon state 
    const $catchBtn = createElement('button', {className:id, id:'toggleCatch'},)
    
    
    // use local storage data to determine button text 
    
    // if pokemon is already caught 
    if(id in caughtList){
        $catchBtn.textContent="Release";
        $catchBtn.classList.remove('btn-danger'); // add visual cues
        $catchBtn.classList.add('btn-success'); //TODO text change work but Bootstrap button styling class not working


    }else{
        $catchBtn.textContent="Catch";
        $catchBtn.classList.remove('btn-success'); // add visual cues
        $catchBtn.classList.add('btn-danger');
        
    };
    // add child elements to the resulting element 
    $detailBody.append($detailName);
    $detailBody.append($catchBtn);
    $detailBody.append($lgSprite);
    $detailBox.append($detailBody);
    
    return $detailBox

}

// listen for click event on pokemon thumnail using event delegation 
$library.addEventListener('click',async function(e){
    e.preventDefault()
    const pokeBox =e.target.closest('.pokemon-box'); // !!! do not forget the selector format dot pokemon-box 
    if (pokeBox ) // use .closest() instead of classList.contains() because the latter 
        {
        // grab id of clicked pokemon
        const pokeID = pokeBox.classList[0]; // first element of classList is always id
        console.log(`${pokeID} is clcked! and its container id is ${pokeBox.id}`) // works 
        
        // get name of the pokemon
        const pokeName = pokeBox.id ;
        
        // Wait for displayDetails to complete and return the details
        const $details = await displayDetails(pokeID, pokeName);
       
        // Clear any existing modal content
        document.getElementById('modalContent').innerHTML = '';
         // Append the new modal content
        document.getElementById('modalContent').appendChild($details);

        // Show the Bootstrap modal
        const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
        modal.show(); 

        // listen for user action 
        let isCaught = false;
        // retrieve catch button from DOM
        const $toggleCatch = document.getElementById('toggleCatch')
        $toggleCatch.addEventListener('click', function(e) {
        e.preventDefault()
        
        isCaught = !isCaught; // toggle caught status
    
        // Set the button text based on the value of isCaught
        $toggleCatch.textContent = isCaught ? 'Release' : 'Catch';
    });
    }
});


