import React, { Component } from 'react'
import axios from "axios"
import { Col, Container, Row } from 'react-bootstrap'
import PokemonCard from '../../Components/PokemonCard/PokemonCard'

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
        this.handleScroll = this.handleScroll.bind(this)
        this.showDetailPageOf = this.showDetailPageOf.bind(this)
    }
    

    componentDidMount() {
        this.getPokemon(null)
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    

    async getPokemon(loadURL: any) {
        try {
            var url = "https://pokeapi.co/api/v2/pokemon"

            if(loadURL != null) {
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
        if ( a.order < b.order ){
            return -1;
        }
        if ( a.order > b.order ){
            return 1;
        }
        return 0;
    }

    loadMore() {
        this.getPokemon(this.nextBatchOfPokemonURL)
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
        const body = document.body
        const html = document.documentElement
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.loadMore()
        }
    }

    showDetailPageOf(pokemon: Pokemon) {
        console.log("Show Detail of "+pokemon.name);
    }

    render() {
        return (
            <div style={{position: "absolute", top: "100%", width: "100%", paddingTop: "10%", paddingBottom: "10%"}}>
                <div style={{position: "relative"}}>
                    <Container>
                        <Row>
                            {
                            this.state.pokemons.length > 0 ?
                            this.state.pokemons.map(pokemon => {
                                return (
                                    <Col md="4" onClick={() => this.showDetailPageOf(pokemon)} key={pokemon.order} >
                                        <PokemonCard pokemon={pokemon}  />
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