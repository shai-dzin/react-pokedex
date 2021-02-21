import React, { Component } from 'react'
import { Card, Container, Image, Row } from 'react-bootstrap'
import {Pokemon} from "../../Containers/Pokedex/Pokedex"
import styles from "./PokemonCard.module.css"
import grassBackground from "../../Images/cardBackground.png"
import PokemonCardType from '../PokemonCardType/PokemonCardType'


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
                <Container>
                    <Row className={styles.typeRow}>
                        {
                        this.props.pokemon.types.map(type => (
                            <PokemonCardType type={type} />
                        ))
                        }
                    </Row>  
                </Container>
                
            </Card>
        )
    }
}

export default PokemonCard