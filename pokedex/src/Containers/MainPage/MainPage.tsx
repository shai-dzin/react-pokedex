import React, { Component } from 'react';
import styles from "./MainPage.module.css";
import { Container, Image } from 'react-bootstrap';
import image from "../../Images/background.jpg";
import Onboarding from '../Onboarding/Onboarding';
import Content from '../Content/Content';

class MainPage extends Component {
    

    render() {
        return (
            <div>
                <Image src={image} className={styles.backgroundImage}/>
                <Container className={styles.contentContainer}>
                    <Content />
                </Container>
            </div>
        );
    }
}

export default MainPage;