import * as React from 'react';
import { Component } from 'react';
// import { Redirect } from 'react-router';
import WebFont from 'webfontloader'

import styles from './Main.module.scss';

WebFont.load({
	google: {
		families: ['Source Sans Pro', 'Fredoka One']
	}
})

export default class Main extends Component<ITokenProps> {

    onClickLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <button onClick={this.onClickLogout}>logout</button>
                    <div>My Projects</div>
                    <button>Discover</button>
                </div>
                <div className={styles.projects}>wef</div>
            </div>
        );
    }
}
