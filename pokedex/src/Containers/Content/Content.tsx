import React, { Component } from 'react';
import Onboarding from '../Onboarding/Onboarding';
import Pokedex from '../Pokedex/Pokedex';

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