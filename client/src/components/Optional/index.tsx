import React, { Component } from 'react';
import { signup } from '../../api'

import CommonStyles from '../portal.module.scss';
import styles from './index.module.scss';

import { onLoginSuccess as onAuthSuccess } from '../../auth';

import InputForm from '../form';
import Btn from '../btn';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import { RouteComponentProps } from 'react-router';

type TState = {
    github: string;
    behance: string;
	dribble: string;
};

interface TProps extends ITokenProps {
	history: History,
}

export default class Optional extends Component<TProps & RouteComponentProps, TState> {
    constructor(props: TProps & RouteComponentProps) {
        super(props);
        this.state = {
            github: '',
            behance: '',
            dribble: ''
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
		// API Call
		// {...this.props.location.state, this.state}
		const {pictures, ...data} = this.props.location.state
		const profileImage = pictures[0]

		const link = [this.state.github, this.state.behance, this.state.dribble]
		console.log({profileImage, ...data, link})
		signup({profileImage, ...data, link}).then((e) => {
			console.log(e)
			onAuthSuccess(this.props.history);
		})
    };

    render() {
        return (
            <div className={CommonStyles.App}>
                <div className={CommonStyles['App-left']}></div>
                <div>
                    <Logo className={CommonStyles.logo} />
                    <h1 className={CommonStyles['Lets-do-Toy-project']}>
                        We want to know you better.
                    </h1>
                    <form
                        onSubmit={this.handleSubmit}
                        className={styles['Form-wrapper']}
                    >
                        <InputForm
                            type="text"
                            name="github"
                            onChange={this.handleChange}
                            placeholder="Github link  (Optional)"
                        ></InputForm>
                        <InputForm
                            type="text"
                            name="behance"
                            onChange={this.handleChange}
                            placeholder="BEHANCE Link (Optional)"
                        ></InputForm>
                        <InputForm
                            type="text"
                            name="dribble"
                            onChange={this.handleChange}
                            placeholder="DRIBBBLE LInk (Optional)"
                        ></InputForm>
                        <Btn />
                    </form>
                </div>
            </div>
        );
    }
}
