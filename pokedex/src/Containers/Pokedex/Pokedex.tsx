import React, { Component } from 'react'
import axios from "axios"
import { Interface } from 'readline'
import { Card, Col, Container, Row } from 'react-bootstrap'
import PokemonCard from '../../Components/PokemonCard'
import { SortedArray } from 'typescript'

interface PokedexState {
    pokemonReferences: PokemonReference[],
    pokemons: Pokemon[]
}

class Pokedex extends Component<any, PokedexState> {
    nextBatchOfPokemonURL: string = ""

    constructor(props: any) {
        super(props)

        this.state = {
            pokemonReferences : [],
            pokemons: []
        }
    }

    componentDidMount() {
        this.getPokemon()
    }

    async getPokemon() {
        try {
            let url = "https://pokeapi.co/api/v2/pokemon"
            const response = await axios.get(url)

            // Insert new Pokemon into Array
            let pokemons: any[] = response.data.results
            pokemons.forEach(ref => {
                let newList = this.state.pokemonReferences
                newList.push(ref)
                this.setState({pokemonReferences: newList})
            });
            
            // Save the URL to the next Batch
            this.nextBatchOfPokemonURL = response.data.next

            // Load Detailed information about them
            this.loadDetailedPokemonInfo()


        } catch (error) {
            console.log(error)
        }
    }

    async loadDetailedPokemonInfo() {
        // Loop through all Pokemon references 
        this.state.pokemonReferences.forEach(async ref => {
            try {
                // Request Data for specific Pokemon
                let pokemonResponse = await axios.get(ref.url)

                // Create new Pokemon instance from response data
                let pokemon: Pokemon = pokemonResponse.data
                pokemon.imageURL = pokemonResponse.data.sprites.other["official-artwork"].front_default
                
                // Add Pokemon to list
                let currentPokemonList = this.state.pokemons
                currentPokemonList.push(pokemon)

                // Sort List because request are async and get finish at different times
                currentPokemonList.sort(this.compare)

                this.setState({pokemons : currentPokemonList})
            } catch (error) {
                console.log(error)
            }
        })
    }


    compare( a: Pokemon, b: Pokemon ) {
        if ( a.id < b.id ){
            return -1;
        }
        if ( a.id > b.id ){
            return 1;
        }
        return 0;
    }

    render() {
        return (
            <div style={{position: "absolute", top: "100%", width: "100%", paddingTop: "10%"}}>
                <div style={{position: "relative"}}>
                    <Container>
                        <Row>
                            {
                            this.state.pokemons.length > 0 ?
                            this.state.pokemons.map(pokemon => {
                                return (
                                    <Col md="4">
                                        <PokemonCard pokemon={pokemon} />
                                    </Col> 
                                )
                            })
                            : 
                            <p>Loading...</p>
                            }
                        </Row>
                    </Container>

                    
                </div>
            </div>
        )
    }
}

export default Pokedex;

interface PokemonReference {
    name: string
    url: string
}

interface PokemonInterface {
    id: number
    name: string
    order: number
    abilities: Ability[]
    moves: Move[]
    stats: Stat[]
    types: Type[]

    
}

export interface Pokemon extends PokemonInterface {
    imageURL: string
}

interface Ability {
    ability : {
        name: string
        url: string
    }
}

interface Move {
    move: {
        name: string
        url: string
    }
}

interface Stat {
    base_stat: number
    effort: number
    stat : {
        name: string,
        url: string
    }
}

interface Type {
    type: {
        name: string
        url: string
    }
}