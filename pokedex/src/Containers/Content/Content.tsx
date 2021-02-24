import React, { Component } from 'react';
import { 
    Route, 
    Switch,
    
} from 'react-router-dom';
import DetailView from '../DetailView/DetailView';
import DetailViewSwitch from '../DetailView/DetailViewSwitch';
import Onboarding from '../Onboarding/Onboarding';
import Pokedex from '../Pokedex/Pokedex';

class Content extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <Onboarding />
                    <Pokedex />
                </Route>
                <Route path="/pokemon/:id" component={DetailView} >
                </Route>
            </Switch>
        );
    }
}

export default Content;