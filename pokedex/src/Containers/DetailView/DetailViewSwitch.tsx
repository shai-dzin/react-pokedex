import React, { Component } from 'react'
import Switch from 'react-bootstrap/esm/Switch'
import { Route, RouteComponentProps } from 'react-router-dom'
import DetailView from './DetailView'

export default class DetailViewSwitch extends Component<RouteComponentProps, {}> {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/:id`} render={(props) => <DetailView {...props} />} />
            </Switch>
        )
    }
}
