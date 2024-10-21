# Pokedex Project

This Pokedex is a dynamic, client-side web application that displays information about various Pokemon using data retrieved from the [PokeAPI](https://pokeapi.co/) and emulated **React** framework with vanilla javaScript. The application allows users to view Pokemon details, "catch" and "release" Pokemon, and store the current state of caught Pokemon in the browser using **localStorage**. 

![ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/f8a8ca42-a707-4733-814b-ad82d30b0b13)

## Features

- **View Pokemon Gallery**: The homepage loads a gallery of Pokemon using data fetched from PokeAPI. Users can scroll through an infinite list of Pokemon by clicking the "Load More" button, which fetches additional data in batches.
- **Pokemon Details Modal**: Users can click on any Pokemon to view a detailed modal, which displays the Pokemon's name, image, weight, and base experience.
- **Catch & Release**: Users can "catch" Pokemon by toggling the catch button in the modal. The caught Pokemon are stored locally and indicated with a badge on their gallery thumbnail.
- **Persistent Data**: Using localStorage, the application saves the state of caught Pokemon and fetched Pokemon, allowing users to leave the page and return without losing their data.

## Technology Stack

- **JavaScript (ES6)**: Handles asynchronous requests, DOM manipulation, and user interaction.
- **HTML5/CSS3**: For layout and styling.
- **Bootstrap**: Ensures a responsive layout and consistent UI elements, such as modals and buttons.
- **PokeAPI**: RESTful API providing the data for Pokemon.

## How It Works

1. **Fetching Data**:
    - The Pokedex fetches Pokemon data using the PokeAPI's `/pokemon` endpoint. Each request retrieves 20 Pokemon, and users can load more by clicking the "Load More" button, which fetches the next batch.
    - The fetched Pokemon data is displayed as cards in the gallery, including a sprite image and the Pokemon's name.

2. **Displaying Pokemon Details**:
    - When a Pokemon card is clicked, its details (e.g., weight, base experience) are fetched using a separate API call based on the Pokemon's ID.
    - A Bootstrap modal displays these details dynamically, allowing the user to "catch" or "release" the Pokemon.

3. **Catch and Release Mechanism**:
    - Users can toggle between catching or releasing a Pokemon. If caught, a red "Caught" badge is shown on the Pokemon's gallery thumbnail, and the Pokemon is added to a list displayed in the sidebar.
    - The catch/release state is stored in the browser’s **localStorage**, ensuring that the user's caught Pokemon list persists even after refreshing or closing the page.

4. **Persistent State with LocalStorage**:
    - **Caught Pokemon**: A list of caught Pokemon is saved in localStorage, which is retrieved and displayed whenever the page is loaded.
    - **Fetched Pokemon**: To avoid redundant API calls, fetched Pokemon data is stored locally and only new Pokemon batches are requested as needed.

## Project Structure

```
├── index.html        # Main HTML file that loads the Pokedex
├── script.js         # Core JavaScript logic for fetching and displaying Pokemon
├── scriptLocal.js    # development version for debugging and testing
├── style.css         # Custom CSS for additional styling

```

### Functions Overview

- **`catchPokemon(name, id)`**: Marks a Pokemon as caught by adding it to the local storage and updating the UI with a "Caught" badge.
- **`releasePokemon(name, id)`**: Removes a Pokemon from the caught list and updates the UI by removing the badge.
- **`displayPokemon(input)`**: Renders the gallery of Pokemon by creating HTML elements dynamically and attaching them to the DOM.
- **`displayDetails(id, name)`**: Fetches and displays detailed information about a Pokemon in a modal.
- **`save(json, tempArr)`**: Saves the fetched Pokemon data to localStorage to prevent redundant API calls.

## Workflow

1. **API Exploration**: The first step was to explore the [PokeAPI documentation](https://pokeapi.co/docs/v2) to understand the data structure and endpoints for retrieving Pokemon details.
2. **HTML and Bootstrap Setup**: Created the basic layout using HTML5 and integrated Bootstrap for quick styling and responsiveness.
3. **Fetching Pokemon Data**: Implemented async functions to fetch Pokemon data from the API in batches of 20 and display them dynamically in the gallery.
4. **Modal for Pokemon Details**: Created a Bootstrap modal that dynamically displays a Pokemon's detailed information, such as weight, base experience, and an official artwork.
5. **Catch and Release Feature**: Added functionality to mark Pokemon as caught or released, with localStorage to persist this state across sessions.
6. **Testing and Debugging**: Throughout development, I fixed issues related to asynchronous data loading, handling localStorage, and displaying unique items without duplication.

## Challenges

- **Managing Asynchronous API Calls**: It was initially challenging to manage the sequence of API requests, especially when loading additional Pokemon or fetching detailed information on user interaction. Using promises (`.then()` and `async/await`) helped solve this issue.
- **State Persistence**: Ensuring that the list of caught Pokemon and the currently fetched Pokemon data persisted between page reloads required careful use of localStorage.
- **UI Consistency**: Dynamically updating the UI to reflect the catch/release state across both the gallery and modal views required manipulating DOM elements effectively.

## Future Improvements

- **Search Functionality**: Add a search bar that allows users to look for specific Pokemon by name or type.
- **Filtering and Sorting**: Introduce filters to sort Pokemon by attributes such as weight, height, or experience.
- **Lazy Loading for Performance**: Improve the gallery's performance by implementing lazy loading for images, so only the visible Pokemon images are fetched and rendered initially.
- **Error Handling**: Implement more robust error handling for API requests, including user feedback when the API is down or the request fails.

