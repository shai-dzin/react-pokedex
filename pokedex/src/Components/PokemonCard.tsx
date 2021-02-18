import React, { Component } from 'react'
import { Card, Image } from 'react-bootstrap'
import {Pokemon} from "../Containers/Pokedex/Pokedex"
import styles from "./PokemonCard.module.css"
import grassBackground from "../Images/cardBackground.png"


class PokemonCard extends Component<{pokemon: Pokemon}, {}> {

    render() {
        return (
            <Card className={styles.pokemonCard} >
                <div className={styles.topBar}>
                    <span className={styles.orderNumber}>#{this.props.pokemon.order}</span>
                    <span className={styles.pokemonName}>{this.props.pokemon.name.toLocaleUpperCase()}</span>
                </div>
                <div className={styles.imageContainer}>
                    <Image src={grassBackground} className={styles.grassBackground}/>
                    <Image src={this.props.pokemon.imageURL} className={styles.pokemonImage} />
                </div>
                
            </Card>
        )
    }
}

export default PokemonCard