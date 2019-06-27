import React, { Component } from 'react';

export default class Login extends Component<ITokenProps> {
    onLoginSuccess = () => {
        localStorage.setItem('token', 'something');
        window.location.href = '/';
    };

    render() {
        return (
            <div>
                Login Plz
                <button onClick={this.onLoginSuccess}>Login</button>
            </div>
        );
    }
}
