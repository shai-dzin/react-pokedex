import React, { Component } from 'react';
import { 
    Route, 
    BrowserRouter as Router,
    Switch,
    RouteComponentProps,
    
} from 'react-router-dom';
import DetailView from '../DetailView/DetailView';
import Onboarding from '../Onboarding/Onboarding';
import Pokedex from '../Pokedex/Pokedex';

class Content extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Onboarding />
                        <Pokedex />
                    </Route>
                    <Route path="/pokemon/:id" render={(props) => <DetailView {...props} />} />
                </Switch>
            </Router>
        );
    }
}

export default Content;