import React, { Component } from 'react';
import styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    RouteProps,
    Redirect
} from 'react-router-dom';
import Login from './components/Login';
import Discover from './components/Discover';
import ProjectDetail from './components/ProjectDetail';
import ProjectList from './components/ProjectList';
import NewPost from './components/NewPost';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

class App extends Component<{}, {}> {
    render() {
        const token = localStorage.getItem('token');
        return (
            <div style={{ height: '100vh' }}>
                <Provider store={store}>
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
                            <PrivateRoute
                                path="/projects/:id/new-post"
                                component={NewPost}
                                token={token}
                            />
                            <PrivateRoute
                                path="/projects/:id"
                                component={ProjectDetail}
                                token={token}
                            />
                            <PrivateRoute
                                exact
                                path="/"
                                component={ProjectList}
                                token={token}
                            />
                            <Redirect to="/" />
                        </Switch>
                    </Router>
                </Provider>
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
