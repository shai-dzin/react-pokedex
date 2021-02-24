import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from "./PokeOnlineLogo.module.css"

export default class PokeOnlineLogo extends Component {
    render() {
        return (
            <Row className={styles.logoRow}>
                <Col>PokeOnline</Col>
            </Row>
        )
    }
}

export class PokeOnlineLogoSmallTop extends Component {
    render() {
        return (
            <Row className={styles.logoRowSmallTop}>
                <Col>PokeOnline</Col>
            </Row>
        )
    }
}

