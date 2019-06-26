import * as React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router';

export default class Main extends Component<ITokenProps> {
    constructor(props: ITokenProps) {
        super(props);
    }


    onClickLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    render() {
        return (
            <div>
                {!this.props.token ? (
                    <Redirect to={'/login'} />
                ) : (
                    <div>
                        Wow login1!
                        <button onClick={this.onClickLogout}>logout</button>
                    </div>
                )}
            </div>
        );
    }
}
