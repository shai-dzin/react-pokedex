import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Onboarding from '../Onboarding/Onboarding';
import Pokedex from '../Pokedex/Pokedex';
import styles from "./Content.module.css";

class Content extends Component {
    render() {
        return (
            <div>
                <Onboarding />
                <Pokedex />
                
            </div>
        );
    }
}

export default Content;