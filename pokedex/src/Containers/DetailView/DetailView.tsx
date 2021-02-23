import React, { Component } from 'react'
import styles from "./DetailView.module.css"
import {Route, RouteComponentProps, Switch} from "react-router-dom"

interface HomeRouterProps {
    id: string;   // This one is coming from the router
}

class DetailView extends Component<RouteComponentProps<HomeRouterProps>, {}> {
    render() {
        return (
            <div>
                {this.props.match.params.id}
            </div>
        )
    }
}

export default DetailView