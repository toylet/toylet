import React, { Component } from 'react';
import { Redirect } from 'react-router';

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
                    <div>
                        Login Plz{' '}
                        <button onClick={this.onLoginSuccess}>Login</button>
                    </div>
                )}
            </div>
        );
    }
}
