import React, { Component } from 'react'
import { Badge, Col } from 'react-bootstrap';
import { PokeType } from '../../Containers/Pokedex/Pokedex'
import styles from "./PokemonCardType.module.css"

interface PokemonCardTypeProps {
    type: PokeType
}

class PokemonCardType extends Component<PokemonCardTypeProps, {}> {

    render() {
        return (
            <Col className={styles.cardTypeCol} >
                <h4><Badge pill variant="secondary">{this.props.type.type.name.toLocaleUpperCase()}</Badge></h4>
            </Col>
            
        )
    }
}

export default PokemonCardType
