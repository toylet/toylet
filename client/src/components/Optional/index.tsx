import React, { Component } from 'react';

import CommonStyles from '../portal.module.scss';
import styles from './index.module.scss';

import { onLoginSuccess } from '../../auth';

import InputForm from '../form';
import Btn from '../btn';
import { ReactComponent as Logo } from '../../svgs/logo.svg';

type TState = {
    github: string;
    behance: string;
	dribble: string;
};

interface TProps extends ITokenProps {
	history: History,
}

export default class Optional extends Component<TProps , TState> {
    constructor(props: TProps) {
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
		// this.state.filter(i => i.lenght)
		// {...this.props.location.state, this.state}
        onLoginSuccess(this.props.history);
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
