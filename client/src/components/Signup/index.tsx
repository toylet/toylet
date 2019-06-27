import React, { Component } from 'react';

import CommonStyles from '../portal.module.scss';
import styles from './index.module.scss';

import InputForm from '../form';
import Btn from '../btn';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import {ReactComponent as Register } from '../../svgs/register.svg'
import { RouteComponentProps } from 'react-router';

type TProps = RouteComponentProps & ITokenProps
type TState =  {
	email: string,
	password: string,
	pwconfirm: string,
}

export default class Sigup extends Component<
    TProps,
    TState> {
    constructor(props: TProps) {
        super(props);
		this.state = {
			email: '',
			password: '',
			pwconfirm: '',
			// isVailed: true
	};
    }
	
	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// @ts-ignore
		this.setState({[e.target.name]: e.target.value})
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (this.state.password === this.state.pwconfirm) {
			// @ts-ignore
			this.props.history.push({
				pathname: '/additional',
				state: this.state
			})
		}
	}

    render() {
        return (
            <div className={CommonStyles.App}>
                <div className={CommonStyles['App-left']}>
					<Register />
				</div>
                <div>
                    <Logo className={CommonStyles.logo} />
                    <h1 className={CommonStyles['Lets-do-Toy-project']}>
                        Start your Toy project with Toylet.
                    </h1>
                    <form onSubmit={this.handleSubmit} className={styles['Form-wrapper']}>
						<InputForm type="email"
							name="email"
							onChange={this.handleChange}
							placeholder="EMAIL"></InputForm>
						<InputForm type="password"
							name="password"
							onChange={this.handleChange}
							placeholder="PASSWORD (8 ~ 32)"></InputForm>
                        <InputForm
							type="password"
							name="pwconfirm"
							onChange={this.handleChange}
                            placeholder="PASSWORD CONFIRM"
                        ></InputForm>
                        <Btn />
                    </form>
                </div>
            </div>
        );
    }
}
