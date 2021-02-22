import React, { Component } from 'react'
import { Badge, Col } from 'react-bootstrap';
import { PokeType } from '../../Containers/Pokedex/Pokedex'
import styles from "./PokemonCardType.module.css"

interface PokemonCardTypeProps {
    type: PokeType
}

interface PokemonCardTypeState {
    typeColor: string
}

class PokemonCardType extends Component<PokemonCardTypeProps, PokemonCardTypeState> {

    constructor(props: PokemonCardTypeProps) {
        super(props)

        this.state = {
            typeColor: "#AAAAAA",
        }
    }

    componentWillMount() {
        this.setState({
            typeColor: this.getColorForPokemonType(this.props.type)
        })
    }
    
    getColorForPokemonType(type: PokeType): string {
        let typeColor: PokeTypeColor = PokeTypeColor[type.type.name as keyof typeof PokeTypeColor]
        return "#"+typeColor
    }

    render() {
        return (
            <Col className={styles.cardTypeCol} >
                <h4><Badge pill style={{backgroundColor: this.state.typeColor, color: "white"}}>{this.props.type.type.name.toLocaleUpperCase()}</Badge></h4>
            </Col>
            
        )
    }
}

export default PokemonCardType

enum PokeTypeColor {
    normal = "A8A77A",
    fighting  = "C22E28",
    flying = "A98FF3",
    poison = "A33EA1",
    ground = "E2BF65",
    rock = "B6A136",
    bug = "A6B91A",
    ghost = "735797",
    steel = "B7B7CE",
    fire = "EE8130",
    water = "6390F0",
    grass = "7AC74C",
    electric = "F7D02C",
    psychic = "F95587",
    ice = "96D9D6",
    dragon = "6F35FC",
    dark = "705746",
    fairy = "D685AD",
    unknown = "AAAAAA",
    shadow = "AAAAAA",
}