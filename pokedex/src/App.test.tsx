import React from 'react';
import { act, render, screen } from '@testing-library/react';
import renderer from "react-test-renderer"
import App from './App';
import Pokedex, { Pokemon } from './Containers/Pokedex/Pokedex';
import DetailView from "./Containers/DetailView/DetailView"
import { assert } from 'console';
import axios from 'axios';

test('Test if main page loads correctly', () => {
  render(<App />);
  const linkElement = screen.getByText("PokeOnline")
  expect(linkElement).toBeInTheDocument();
});

it("Test if Pokemon are compared correctly", () => {
  let pokemon1: Pokemon = {
    name: "Bulbasor",
    order: 1,
    imageURL: "",
    id: 1,
    abilities: [],
    moves: [],
    stats: [],
    types: []
  }

  let pokemon2: Pokemon = {
    name: "Ivysaur",
    order: 2,
    imageURL: "",
    id: 2,
    abilities: [],
    moves: [],
    stats: [],
    types: []
  }

  let pokedex = new Pokedex([])
  var result = pokedex.compare(pokemon1, pokemon2)  
  expect(result).toBe(-1)

  result = pokedex.compare(pokemon2, pokemon1)
  expect(result).not.toBe(-1)
})

it("Test if the Pokemon Load", async () => {
  render(<App />)
    
  expect(await screen.findByText("Loading...")).toBeInTheDocument();

  expect(await screen.findByText("BULBASAUR")).toBeInTheDocument();
});
