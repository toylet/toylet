import React, { Component } from 'react';
import styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    RouteProps,
    Redirect
} from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Discover from './components/Discover';

class App extends Component<{}, {}> {
    render() {
        const token = localStorage.getItem('token');
        return (
            <div className={styles.App}>
                <Router>
                    <Switch>
                        <AuthRoute
                            path="/login"
                            component={Login}
                            token={token}
                        />
                        <PrivateRoute
                            path="/discover"
                            component={Discover}
                            token={token}
                        />
                        <PrivateRoute path="/" component={Main} token={token} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

class AuthRoute<P extends RouteProps = RouteProps> extends Component<
    P & ITokenProps
> {
    render() {
        const { token, component: Comp, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props => {
                    return token ? (
                        <Redirect to={'/login'} />
                    ) : (
                        // @ts-ignore
                        <Comp {...props} />
                    );
                }}
            />
        );
    }
}

class PrivateRoute<P extends RouteProps = RouteProps> extends Component<
    P & ITokenProps
> {
    render() {
        const { token, component: Comp, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props => {
                    return !token ? (
                        <Redirect to={'/login'} />
                    ) : (
                        // @ts-ignore
                        <Comp {...props} />
                    );
                }}
            />
        );
    }
}

export default App;
