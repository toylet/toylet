import React, { Component } from 'react';

import CommonStyles from '../portal.module.scss'
import styles from './index.module.scss'

import InputForm from '../form'
import Btn from '../btn'
import { ReactComponent as Logo } from '../../svgs/logo.svg'


export default class Login extends Component<ITokenProps> {
    render() {
        return (
                <div className={CommonStyles.App}>
					<div className={CommonStyles['App-left']}></div>
					<div>
						<Logo className={CommonStyles.logo}/>
						<h1 className={CommonStyles['Lets-do-Toy-project']}>Start your Toy project
with Toylet.</h1>
				<div className={styles['profile-image']}></div>
				<div className={styles['Form-wrapper']}>
					<InputForm type="name" placeholder="NAME"></InputForm>
					<InputForm type="text" placeholder="JOB"></InputForm>
					<InputForm type="text" placeholder="LANGUAGE"></InputForm>
				</div>
					<Btn/>
				</div>
				{/* <button onClick={this.onLoginSuccess}>Login</button> */}
			</div>
        );
    }
}
