import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

import CommonStyles from '../portal.module.scss'
import styles from './index.module.scss'

import InputForm from '../form'
import Btn from '../btn'
import { ReactComponent as Logo } from '../../svgs/logo.svg'


export default class Sigup extends Component<ITokenProps, { pictures: File[] }> {
	constructor(props: ITokenProps) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
	}
	
	onDrop(pictureFiles: File[]) {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
		})
	}
	
    render() {
        return (
                <div className={CommonStyles.App}>
					<div className={CommonStyles['App-left']}></div>
					<div>
						<Logo className={CommonStyles.logo}/>
						<h1 className={CommonStyles['Lets-do-Toy-project']}>Start your Toy project
with Toylet.</h1>
				<div className={styles['profile-image']}>
					<ImageUploader
                		withIcon={true}
                		buttonText='Choose images'
                		onChange={this.onDrop}
                		imgExtension={['.jpg', '.gif', '.png', '.gif']}
                		maxFileSize={5242880}
            		/>
				</div>
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
