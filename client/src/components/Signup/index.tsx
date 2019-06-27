import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

import CommonStyles from '../portal.module.scss';
import styles from './index.module.scss';

import {onLoginSuccess} from '../../auth'
import InputForm from '../form';
import Btn from '../btn';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import { RouteComponentProps } from 'react-router';

type TProps = RouteComponentProps & ITokenProps
type TState =  {
	pictures: File[],
	name: string,
	job: string,
	lang: string,
}

export default class Sigup extends Component<
    TProps,
    TState> {
    constructor(props: TProps) {
        super(props);
		this.state = {
			pictures: [],
			name: '',
			job: '',
			lang: ''
	};
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles: File[]) {
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });
	}
	
	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// @ts-ignore
		this.setState({[e.target.type]: e.target.value})
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onLoginSuccess(this.props.history)
	}

    render() {
        return (
            <div className={CommonStyles.App}>
                <div className={CommonStyles['App-left']}></div>
                <div>
                    <Logo className={CommonStyles.logo} />
                    <h1 className={CommonStyles['Lets-do-Toy-project']}>
                        Start your Toy project with Toylet.
                    </h1>
                    <div className={styles['profile-image']}>
                        <ImageUploader
                            withIcon={true}
                            buttonText="Choose images"
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                    </div>
                    <form onSubmit={this.handleSubmit} className={styles['Form-wrapper']}>
						<InputForm type="name"
						onChange={this.handleChange}
						placeholder="NAME"></InputForm>
						<InputForm type="job"
						onChange={this.handleChange}
						placeholder="JOB"></InputForm>
                        <InputForm
							type="lang"
							onChange={this.handleChange}
                            placeholder="LANGUAGE"
                        ></InputForm>
                        <Btn />
                    </form>
                </div>
            </div>
        );
    }
}
