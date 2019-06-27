import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import {onLoginSuccess} from '../../auth'

import CommonStyles from '../portal.module.scss';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

import InputForm from '../form';
import Btn from '../btn';

import { ReactComponent as Women } from '../../svgs/login.svg';
import { ReactComponent as Logo } from '../../svgs/logo.svg';

interface LoginProps extends ITokenProps{}
interface LoginProps extends RouteComponentProps{}

export default class Login extends Component<LoginProps> {
	constructor(props: LoginProps) {
		super(props);
		console.log(props)
		this.state = {
			email: '',
			password: '',
		}
	}

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({[e.target.type]: e.target.value})
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onLoginSuccess(this.props.history)
	}
    render() {
        return (
            <div>
				<div className={CommonStyles.App}>
					<div className={CommonStyles['App-left']}>
						<Women className={styles.women} />
					</div>
					<div>
						<Logo className={CommonStyles.logo}/>
						<h1 className={CommonStyles['Lets-do-Toy-project']}>Let’s do Toy project Steadily.</h1>
					<form onSubmit={this.handleSubmit} className={styles['Form-wrapper']}>
						<InputForm type="email" onChange={this.handleChange}  placeholder="EMAIL"></InputForm>
						<InputForm type="password" onChange={this.handleChange} placeholder="PASSWORD (8-32)"></InputForm>
						<Link to="/signup" className={styles['Dont-have-an-account']}>
					Don’t have an <span className={styles['text-style']}>account</span>?
					</Link>
					<Btn />
					</form>
					</div>
				</div>
			</div>
        );
    }
}
