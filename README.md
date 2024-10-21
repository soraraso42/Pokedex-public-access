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

start by looking at manual page of Pokedex to understand the structure of the JSON data in the API call response
decide what detailed info of a pokemon to display to user as there are hundreds of features of each Pokemon
decided on name, height and size as theses are highly relevant attributes to Pokemon hunters , aka, my users
two size images are chosen: one for thumbnail display in library view; a larger one for detailed display when a user clicks on it.
test to ensure I have identifed the correct keys to retrieve the textual and img url information I will need
implement basic layout of 50 cards in a grid library layout with bootstrap card classes
using a for loop to populate each card with info from retrieved JSON 
use javaScript to implement the click to view details, catch and release functionality
using localStorage to cache status of caught Pokemons

## Challenges and Learnings


## Future Improvements

