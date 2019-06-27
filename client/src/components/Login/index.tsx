import React, { Component } from 'react';
import { Redirect } from 'react-router';

import WebFont from 'webfontloader'
import CommonStyles from '../portal.module.scss'
import styles from './index.module.scss'
import { Link } from 'react-router-dom';

import InputForm from '../form'
import Btn from '../btn'

import { ReactComponent as Women } from '../../svgs/login.svg'
import { ReactComponent as Logo } from '../../svgs/logo.svg'

WebFont.load({
	google: {
		families: ['Source Sans Pro', 'Fredoka One']
	}
})

export default class Login extends Component<ITokenProps> {
    onLoginSuccess = () => {
        localStorage.setItem('token', 'something');
        window.location.href = '/';
    };

    render() {
        return (
            <div>
                {this.props.token ? (
                    <Redirect to={'/'} />
                ) : (
                    <div className={CommonStyles.App}>
						<div className={CommonStyles['App-left']}>
							<Women className={styles.women} />
						</div>
						<div>
							<Logo className={CommonStyles.logo}/>
							<h1 className={CommonStyles['Lets-do-Toy-project']}>Let’s do Toy project
Steadily.</h1>
						<div className={styles['Form-wrapper']}>
							<InputForm type="email" placeholder="EMAIL"></InputForm>
							<InputForm type="password" placeholder="PASSWORD (8-32)"></InputForm>
						</div>
						<Link to="/reg" className={styles['Dont-have-an-account']}>
						Don’t have an <span className={styles['text-style']}>account</span>?
						</Link>
						<Btn />
						</div>
						{/* <button onClick={this.onLoginSuccess}>Login</button> */}
						
                    </div>
                )}
            </div>
        );
    }
}
