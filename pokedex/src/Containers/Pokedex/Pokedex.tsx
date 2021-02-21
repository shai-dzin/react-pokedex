import React, { Component } from 'react'
import axios from "axios"
import { Interface } from 'readline'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import PokemonCard from '../../Components/PokemonCard/PokemonCard'
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

        this.getPokemon = this.getPokemon.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }
    

    componentDidMount() {
        this.getPokemon(null)
    }

    async getPokemon(loadURL: any) {
        try {
            var url = "https://pokeapi.co/api/v2/pokemon"

            if(loadURL != undefined || loadURL != null) {
                url = loadURL
            }

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
            console.log(this.nextBatchOfPokemonURL)

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

                this.setState({
                    pokemons : currentPokemonList,
                    pokemonReferences : []
                })
                
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

    loadMore() {
        this.getPokemon(this.nextBatchOfPokemonURL)
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
                        <Row>
                            <Col style={{textAlign : 'center'}}>
                                <Badge variant="secondary" pill onClick={this.loadMore} style={{padding: "5px 15px"}} ><h5>Load More</h5></Badge>
                            </Col>
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
    types: PokeType[]
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

export interface PokeType {
    type: {
        name: string
        url: string
    }
}