import React, { Component } from 'react';
import { Container, Image} from 'react-bootstrap';
import styles from "./Onboarding.module.css";
import chevronDown from "../../Images/chevron-down-white.png";
import PokeOnlineLogo from '../../Components/PokeOnlineLogo/PokeOnlineLogo';

class Onboarding extends Component {
    render() {
        return (
            <Container>
                <PokeOnlineLogo />
                <Image src={chevronDown} className={styles.chevronDown} />
            </Container>
        );
    }
}

export default Onboarding;