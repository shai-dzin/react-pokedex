import React, { Component } from 'react';
import styles from "./MainPage.module.css";
import { Image } from 'react-bootstrap';
import image from "../../Images/background.jpg";
import Content from '../Content/Content';

class MainPage extends Component {
    

    render() {
        return (
            <div>
                <Image src={image} className={styles.backgroundImage}/>
                <div className={styles.contentContainer}>
                    <Content />
                </div>
            </div>
        );
    }
}

export default MainPage;