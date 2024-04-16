// =====initiate variables ====
const $library = document.getElementById("pokemon-library");
const $load = document.getElementById("load");
const $list = document.getElementById("pokemon-list");
// local storage : data structure need 3 kv pairs
//get the next API call url, if empty set it to get the first 20
let $next = "";

if (localStorage.getItem("next")) {
  $next = localStorage.getItem("next");
} // not first load
else {
  localStorage.setItem(
    "next",
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
  );
} // first load

// stores data about pokemons on page until explicit clear

// initiate a holder variable for on-page display
let tempArr = localStorage.getItem("gallery")
  ? JSON.parse(localStorage.getItem("gallery"))
  : [];

// initiate a list of caught pokemons
let caughtList = localStorage.getItem("caughtList")
  ? JSON.parse(localStorage.getItem("caughtList"))
  : [];
// remove duplicates
let caughtListTemp = caughtList.map(JSON.stringify);
let caughtListTemp2 = new Set(caughtListTemp);
caughtList = Array.from(caughtListTemp2).map(JSON.parse);
// console.log("caughtList after initialization is :\n");
console.log(caughtList);

// display caughtList
// displayList(caughtList); // not the right place

// store into local
localStorage.setItem("caughtList", JSON.stringify(caughtList));

// =====initiate functions ====

// function receives name of pokemon to catch , put banner on thumbnail
// and store name into local storage
function catchPokemon(name, id) {
  const thumbnail = document.getElementById(`${id}`);
  thumbnail.classList.remove("d-none");
  if (!caughtList.includes(name)) {
    // avoid adding duplicates
    caughtList.push(name);
  }
  localStorage.setItem("caughtList", JSON.stringify(caughtList));
}
//

// function receives name of pokemon to release and remove from local storage
// and remove banner from thumbnail
function releasePokemon(name, id) {
  const thumbnail = document.getElementById(`${id}`);
  thumbnail.classList.add("d-none");
  caughtList.pop(name);
  localStorage.setItem("caughtList", JSON.stringify(caughtList));
}
//

// function add an object from API to localArray // 20 objects inside
function save($json, tempArr) {
  let json;
  // use concat
  if (tempArr.length == 0) {
    json = $json;
  } else {
    json = tempArr.concat($json);
  }
  // Create an array of UNIQUE objects

  jsonObject = json.map(JSON.stringify);
  uniqueSet = new Set(jsonObject);

  uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  console.log(uniqueArray); // correctly achieved

  // put array of unique objects to localStorage
  localStorage.setItem("gallery", JSON.stringify(uniqueArray)); //correctly stored as a string
}
//

// function emulate react framework with custom function return an element
function createElement(type, props, ...children) {
  const $el = document.createElement(type);
  // props is a js object
  // go over each k:v pair with for...in...
  for (const prop in props) {
    $el[prop] = props[prop];
  }
  $el.append(...children);
  return $el;
}
//

// function return the Pokemon's id from the provided url
function parseUrl(url) {
  return url.substring(
    url.substring(0, url.length - 2).lastIndexOf("/") + 1,
    url.length - 1,
  );
}
//

// function retrieve caught list from storage, iterate and prepend to  list on page
function displayList() {
  // update the input list against local storage
  // initiate a list of caught pokemons
  let caughtList = localStorage.getItem("caughtList")
    ? JSON.parse(localStorage.getItem("caughtList"))
    : [];
  // remove duplicates
  let caughtListTemp = caughtList.map(JSON.stringify);
  let caughtListTemp2 = new Set(caughtListTemp);
  caughtList = Array.from(caughtListTemp2).map(JSON.parse);
  console.log("caughtList inside displayList is :\n");
  console.log(caughtList);
  let ls = caughtList;
  for (let c of ls) {
    console.log(c);
    const caught = createElement("li", { className: "list-group-item" }, c);
    $list.prepend(caught);
  }
}
//

// function create a display for pokemons from input array of pokemon objects
// and save input array to localStorage
function displayPokemon(input) {
  // save gallery to localStorage
  save(input, tempArr);
  for (let p of input) {
    // pokemon face
    const $sprite = createElement("img", {
      className: "pokemon-sprite",
      src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseUrl(p.url)}.png`,
      alt: ` thumbnail for ${p.name} `, // improve accessibility
    }); // insert smaller thumbnail according to pokemon id
    $sprite.classList.add("figure-img", "img-fluid", "mt-3");

    // add caughtbanner // default hidden with d-none
    const $caughtBanner = createElement(
      "span",
      {
        className: "caught",
        id: `${parseUrl(p.url)}`, // numerical id of pokemon for catch/release
      },
      "CAUGHT",
    );
    $caughtBanner.classList.add(
      "d-none",
      "position-absolute",
      "z-3",
      "top-50",
      "start-50",
      "translate-middle",
      "badge",
      "rounded-5",
      "bg-danger",
      "opacity-75",
    );
    // check if this pokemon is caught already

    if (caughtList.includes(p.name)) {
      $caughtBanner.classList.remove("d-none");
    }
    const $spriteContainer = createElement(
      "div",
      { className: "spriteContainer" },
      $sprite,
      $caughtBanner,
    );
    $spriteContainer.classList.add("position-relative", "card-body");

    // pokemon name
    const $name = createElement(
      "caption",
      { className: "pokemon-name" },
      p.name,
    );
    $name.classList.add("text-center", "d-3", "py-auto", "mb-4");
    // put face and pokemon in display box
    const $box = createElement(
      "figure",
      { className: parseUrl(p.url), id: p.name },
      $spriteContainer,
      $name,
    ); // ensure first element of classList is always id
    // because of the - in attribute names, cannot add directly with createElement()
    // $box.setAttribute('data-bs-toggle', 'modal'); // DEL this cause backdrop typeError
    $box.setAttribute("data-bs-target", "#detailBox");
    $box.classList.add(
      "pokemon-box",
      "col-4",
      "col-md-3",
      "col-lg-2",
      "justify-content-center",
      "text-center",
      "figure",
      "bg-light",
      "bg-gradient",
      "border-5",
      "border-white",
      "rounded",
      "card",
      "m-auto",
    );

    // add box to library
    $library.prepend($box); // changed from append to prepend such that user can see newly added pokemons without scrolling far
  }
}
//

// function receives id and name returns a card-like element with larger image and 2 details
// use a card template from bootstrap and use modal to display
function displayDetails(id, name) {
  const $detailBody = createElement("div", { className: "card-body" });
  $detailBody.classList.add("text-center");
  const $detailBox = createElement("div", {
    className: "card",
    id: "detailBox",
  });
  $detailBox.classList.add("border-0");
  const $lgSprite = createElement("img", {
    className: "pokemon-sprite-lg",
    src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  });
  $lgSprite.classList.add("img-card-center", "img-fluid");
  // display pokeName as card title
  const $detailName = createElement("p", { className: "card-title" }, name);
  $detailName.classList.add("display-4", "text-center");

  // retrieve and display details with async
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) // this returns a promise
    .then((response) => response.json())
    // display base experience score and weight
    /* .then(id => { console.log(id) })// this gives undefined because the parameters contained in the parsed json data need to be handled inside this function
  // FIXED this data is not retrieved 
  // const $weight = createElement('p',{className: 'card-text'}, `weight: ${weight.name}`) ;
  / $detailBody.append($weight);    */
    .then((data) => {
      //console.log(data) // was returning undefined when prev line is console.log(response.json()) because the data parsed can be understood to be already passed to console.log() func
      $weight = createElement(
        "p",
        { className: "card-text" },
        `weight: ${data.weight}`,
      );
      $weight.classList.add("h3");
      $experience = createElement(
        "p",
        { className: "card-text" },
        `base experience: ${data.base_experience}`,
      );
      $experience.classList.add("h3");
      // console.log($weight)
      $detailBody.append($weight);
      $detailBody.append($experience);
    });
  //  add toggle and initial text that is based on pokemon state
  const $catchBtn = createElement("button", {
    className: id,
    id: "toggleCatch",
  });

  // use local storage data to determine button text

  // if pokemon is already caught
  if (name in caughtList) {
    $catchBtn.textContent = "Release";
    $catchBtn.classList.remove("btn-danger", "catch"); // add visual cues
    $catchBtn.classList.add("btn-success", "release"); //TODO text change work but Bootstrap button styling class not working
  } else {
    $catchBtn.textContent = "Catch";
    $catchBtn.classList.remove("btn-success", "release"); // add visual cues
    $catchBtn.classList.add("btn-danger", "catch");
  }
  // add child elements to the resulting element
  $detailBody.append($detailName);
  $detailBody.append($catchBtn);
  $detailBody.append($lgSprite);
  $detailBox.append($detailBody);

  return $detailBox;
}
//

// if tempArr is empty fetch from beginning
// else display from tempArr
if (tempArr.length == 0) {
  fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
    // {fetch("https://pokeapi.co/api/v2/berry/?/offset=20&limit=20") // FIXED this retrieves berry, NOT pokemons
    .then((response) => response.json())
    // .then(data =>console.log(data))
    .then((data) => {
      displayPokemon(data.results);
      $next = data.next; // update url
      localStorage.setItem("next", $next); // store url
      console.log(`first load is ${data.results}`);
      // listen for user click on load more btn
      $load.addEventListener("click", function (e) {
        e.preventDefault();
        // console.log("load button is clicked");
        // next url is contained in the response
        const nextBatch = fetch($next) // DONE store and update this parameter
          .then((response) => response.json())
          .then((data) => {
            displayPokemon(data.results);
            $next = data.next; // update the next url
            // store the updated url to localStorage
            localStorage.setItem("next", $next);
            console.log(`updated next ${$next}`);
          }); // DONE repeatedly load more
      });
    })

    .catch((error) => console.error("Error fetching data:", error));
} else {
  displayPokemon(tempArr);

  // display caught list
  displayList();

  // listen for user click on load more btn
  $load.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("load button is clicked");
    // next url is from local Storage
    $next = localStorage.getItem("next");
    console.log(`this should be a url ${$next}`);
    const nextBatch = fetch($next)
      .then((response) => response.json())
      .then((data) => {
        displayPokemon(data.results);
        $next = data.next; // update the next url
        localStorage.setItem("next", $next); // store updated value to local
      }); // repeatedly load more
  });
}

// listen for click event on pokemon thumnail using event delegation
$library.addEventListener("click", async function (e) {
  e.preventDefault();
  const pokeBox = e.target.closest(".pokemon-box"); // !!! do not forget the selector format dot pokemon-box
  if (pokeBox) {
    // use .closest() instead of classList.contains() because the latter
    // grab id of clicked pokemon
    const pokeID = pokeBox.classList[0]; // first element of classList is always id
    // console.log(`${pokeID} is clcked! and its container id is ${pokeBox.id}`); // works

    // get name of the pokemon
    const pokeName = pokeBox.id;

    // Wait for displayDetails to complete and return the details
    const $details = await displayDetails(pokeID, pokeName);

    // Clear any existing modal content
    document.getElementById("modalContent").innerHTML = "";
    // Append the new modal content
    document.getElementById("modalContent").appendChild($details);

    // Show the Bootstrap modal
    const modal = new bootstrap.Modal(document.getElementById("pokemonModal"));

    modal.show();

    let isCaught = false;
    // use local storage to find if pokemon is already caught
    if (pokeName in caughtList) {
      isCaught = true;
    }

    console.log(isCaught); // TODO this is incorrect
    // retrieve catch button from DOM
    const $toggleCatch = document.getElementById("toggleCatch");
    $toggleCatch.addEventListener("click", function (e) {
      e.preventDefault();

      isCaught = !isCaught; // toggle caught status

      // Set the button text based on the value of isCaught
      $toggleCatch.textContent = isCaught ? "Release" : "Catch";
      const modalContent = document.getElementById("modalContent");
      if (isCaught) {
        catchPokemon(pokeName, pokeID);
        //change opacity to indicate
        // modalContent.style.opacity = 0.5;
        modalContent.classList.add("opacity-50");
      } else {
        releasePokemon(pokeName, pokeID);
        modalContent.classList.remove("opacity-50");
        // modalContent.style.opacity = 1;
      }
      console.log(`list of caught ${caughtList}`); // this can be updated correctly
    });
  }
});

// displayList(); cannot put here.

// display a list of caught pokemons
// caughtList = localStorage.getItem("caughtList")
//   ? JSON.parse(localStorage.getItem("caughtList"))
//   : [];
// correctly add and remove both on page and in local storage
// const testList = ["catch1", "catch2"];
// displayList(testList); // this function works
