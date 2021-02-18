import React, { Component } from 'react';
import { Container, Row, Image, Col} from 'react-bootstrap';
import styles from "./Onboarding.module.css";
import chevronDown from "../../Images/chevron-down-white.png";

class Onboarding extends Component {
    render() {
        return (
            <Container>
                <Row className={styles.logoRow}>
                    <Col>PokeOnline</Col>
                </Row>
                <Image src={chevronDown} className={styles.chevronDown} />
            </Container>
        );
    }
}

export default Onboarding;