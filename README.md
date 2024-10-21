# Pokedex


## Overview

An interactive Pokedex web application using [PokeApi](https://pokeapi.co) that allows users to choose to load more Pokemon, view details about a specific Pokemon, "catch" and "release" specific Pokemons.

## Technology Stack

RESTful APIs, javaScript, Bootstrap

## Key functionality

Using Async callback functions in javaScript to call the Pokedex API 
parse retried JSON data to display names, heights, sizes and two images of each pokemon
A local variable is used to ensure the next request start on the end of the prior request (implement caching without a wrapper library)
a grid layout is used to ensure responsive user experience
boostrap classes are used to ensure consistent display and clear/unambiguous user feedback such as classes and btn-danger btn-success

## Workflow

- start by looking at manual page of Pokedex to understand the structure of the JSON data in the API call response
- decide what detailed info of a pokemon to display to user as there are hundreds of features of each Pokemon
- decided on name, height and size as theses are highly relevant attributes to Pokemon hunters , aka, my users
- two size images are chosen: one for thumbnail display in library view; a larger one for detailed display when a user clicks on it.
- test to ensure I have identifed the correct keys to retrieve the textual and img url information I will need
- implement basic layout of 50 cards in a grid library layout with bootstrap card classes
- using a for loop to populate each card with info from retrieved JSON 
- use eventListener to implement the click to view details, catch and release functionality
- use dialog to display a larger image of Pokemon
- using localStorage to cache status of caught Pokemons

## Challenges and Learnings

- implement async API calls repeatedly was difficult, especially starting from where the previous call ended part. Trial and error before correctly using what the API provides to "remember"
- position of script containing callback functions should be after the DOM loaded or using delay attribute in the script tag if placing it earlier
- struggled with implementing the dialog function
- grid layout

## Future Improvements
- can implement a search function that allows user to search for a given specs of a Pokemon, provided the user already knows what the spec is called. It can be implemented by simply using the query as a key
- can implement a compare function where specs of two chosen Pokemon are displayed side by side for comparison. The comparison can be a table within a dialog. 

