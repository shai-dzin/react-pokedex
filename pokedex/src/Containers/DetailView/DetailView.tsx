import React, { Component } from 'react'
import styles from "./DetailView.module.css"
import {Link, RouteComponentProps, withRouter} from "react-router-dom"
import { Pokemon, PokemonReference } from '../Pokedex/Pokedex'
import { Col, Container, Image, Row } from 'react-bootstrap'
import {PokeOnlineLogoSmallTop} from '../../Components/PokeOnlineLogo/PokeOnlineLogo'
import axios from 'axios'

interface PokemonRouterProps {
    id: string;   // This one is coming from the router
}

interface PokemonRouterState {
    pokemon?: Pokemon,
    evolutionChain: Pokemon[]
}

class DetailView extends Component<RouteComponentProps<PokemonRouterProps>, PokemonRouterState> {

    constructor(props: RouteComponentProps<PokemonRouterProps>) {
        super(props)

        this.state = {
            pokemon: undefined,
            evolutionChain: []
        }
    }

    componentDidMount() {
        this.getPokemon()
    }

    componentDidUpdate(props: RouteComponentProps<PokemonRouterProps>) {
        if(props.history.location.pathname !== props.location.pathname) {
            this.getPokemon()
        }
    }

    async getPokemon() {
        try {
            let pokemonID = this.props.match.params.id
            let url = "https://pokeapi.co/api/v2/pokemon/"+pokemonID

            const response = await axios.get(url)

            // Insert new Pokemon into Array
            let pokemon: Pokemon = response.data
            pokemon.imageURL = response.data.sprites.other["official-artwork"].front_default
            this.setState({pokemon: pokemon})

            // Start Loading Evolution Chain
            this.loadEvolutionChain(pokemonID)

        } catch (error) {
            console.log(error)
        }
    }

    async loadEvolutionChain(id: string) {
        let speciesURL = "https://pokeapi.co/api/v2/pokemon-species/"+id
        const responseSpecies = await axios.get(speciesURL)

        let evolutionChainURL = responseSpecies.data.evolution_chain.url
        const responseEvolution = await axios.get(evolutionChainURL)
        
        this.parseEvolutionChain(responseEvolution.data.chain)
    }

    parseEvolutionChain(chain: any) {        
        var evoChain: PokemonReference[] = []
        var evoData = chain

        do {
        evoChain.push({
            "name": evoData.species.name,
            "url" : evoData.species.url
        })

        evoData = evoData['evolves_to'][0]
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

        this.identifyNeededEvolutionsToLoad(evoChain)
    }

    identifyNeededEvolutionsToLoad(evoChainReferences: PokemonReference[]) {
        let currentName = this.state.pokemon?.name

        let indexOfCurrentPokemonInChain = evoChainReferences.findIndex(ref => {
            return ref.name === currentName
        })
        
        // Set url of pokemon that we do not need to check as an empty string
        evoChainReferences[indexOfCurrentPokemonInChain].url = ""        

        this.loadMissingPokemon(evoChainReferences)
    }

    async loadMissingPokemon(evoChainReferences: PokemonReference[]) {
        var evolutionChainPokemon: Pokemon[] = []

        await Promise.all(evoChainReferences.map(async (ref, index) => {
            if (ref.url === "") evolutionChainPokemon[index] = this.state.pokemon!
            else {
                let splitURL = ref.url.split("/")
                var pokemonID = ""
                let lastElement = splitURL.pop()
                if (lastElement === "") pokemonID = splitURL.pop()!
                else pokemonID = lastElement!

                let urlToLoadPokemon = "https://pokeapi.co/api/v2/pokemon/"+pokemonID

                let response = await axios.get(urlToLoadPokemon)
                let pokemon: Pokemon = response.data
                pokemon.imageURL = response.data.sprites.other["official-artwork"].front_default

                evolutionChainPokemon[index] = pokemon
            }
        }))

        this.setState({
            evolutionChain: evolutionChainPokemon
        })
    }
    
    getTypesAsString(): string {
        var output: string = ""
        this.state.pokemon?.types.map((type, index, all) => {
            output += type.type.name.toUpperCase()
            if (index < (all.length - 1)) output += ", "
            return output
        })
        return output
    }

    getAbilitesAsUL() {
        return (
            <ul className={styles.abilitiesList}>
                {
                    this.state.pokemon?.abilities.map(ability => {
                        return <li key={ability.ability.name}><h3>{ability.ability.name.toUpperCase()}</h3></li>
                    })
                }
            </ul>
        )
    }

    getBaseStats() {
        return (
            <div>
                {
                this.state.pokemon?.stats.map(stat => {
                    return <h2><span className={styles.statName}>{stat.stat.name.toUpperCase()}:</span> {stat.base_stat}</h2>
                })
                }
            </div>
        )
    }

    getMoves() {
        return (
            <div style={{overflowY: "scroll", maxHeight: "200vh"}}>
                {
                this.state.pokemon?.moves.map(move => {
                    return <h2>{move.move.name}</h2>
                })
                }
            </div>
        )
    }

    render() {
        return (
            <Container fluid className={styles.detailsContainer}>
                <Link to="/" className={styles.logo}>
                    <PokeOnlineLogoSmallTop />
                </Link>
                <Row className={styles.imageRow + " justify-content-md-center"}>
                    <Col md="3" className="d-none d-md-block align-items-center" >
                        <div className={styles.evolutionImagesDiv}>
                        { 
                            this.state.evolutionChain.map((pokemon, index) => {                                
                                let indexOfPagePokemon = this.state.evolutionChain.findIndex(p => p === this.state.pokemon!)                                
                                

                                if(index < indexOfPagePokemon) {
                                    let url = "/pokemon/"+pokemon.id

                                    return (
                                        <Link to={url} key={pokemon.id} >
                                            <Image fluid src={pokemon.imageURL} className={styles.evolutionImage} key={pokemon.id} />
                                        </Link>
                                    )
                                }
                            })

                        }
                        </div>
                    </Col>
                    <Col xs="2" sm="2" md="1" />
                    <Col xs="8" sm="8" md="3">
                        <Image fluid className={styles.centerImagePokemon + " "} src={this.state.pokemon?.imageURL} key={this.state.pokemon?.id}/>
                    </Col>
                    <Col xs="2" sm="2" md="1" />
                    <Col md="3" className="d-none d-md-block">
                        <div className={styles.evolutionImagesDiv}>
                        { 
                            this.state.evolutionChain.map((pokemon, index) => {
                                let indexOfPagePokemon = this.state.evolutionChain.findIndex(p => p === this.state.pokemon!)                                

                                if(index > indexOfPagePokemon) {
                                    let url = "/pokemon/"+pokemon.id
                                    
                                    return (
                                        <Link to={url}  key={pokemon.id}>
                                            <Image fluid src={pokemon.imageURL} className={styles.evolutionImage} />
                                        </Link>
                                    )
                                }else {
                                    return ""
                                }
                            })

                        }
                        </div>
                    </Col>
                </Row>
                <Row className={styles.infoRow}>
                    <Col md="3">
                        <div>
                            <h2><span className={styles.infoTitle}>Name:</span> {this.state.pokemon?.name.toLocaleUpperCase()}</h2>
                            <h2><span className={styles.infoTitle}>Type:</span>{this.getTypesAsString()}</h2>
                        </div>
                    </Col>
                    <Col md="3">
                        <div>
                            <h2><span className={styles.infoTitle}>Order Number:</span> #{this.state.pokemon?.order}</h2>
                            <h2 className={styles.infoTitle}>Abilities:</h2>
                            {this.getAbilitesAsUL()}
                        </div>
                    </Col>
                    <Col md="3">
                        <h2 className={styles.infoTitle}>Base Stats</h2>
                        {this.getBaseStats()}
                    </Col>
                    <Col md="3" className={styles.movesCol}>
                        <h2 className={styles.infoTitle}>Moves</h2>
                        {this.getMoves()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default DetailView