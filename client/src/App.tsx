import React, { Component } from 'react';
import styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    RouteProps,
    Redirect
} from 'react-router-dom';
import WebFont from 'webfontloader';
import Discover from './components/Discover';
import ProjectDetail from './components/ProjectDetail';
import Signup from './components/Signup/';
import AdditionInfo from './components/AdditionInfo';
import Optional from './components/Optional'
import ProjectList from './components/ProjectList';
import NewPost from './components/NewPost';
import { Provider } from 'react-redux';
import configureStore from './store';

WebFont.load({
    google: {
        families: ['Source Sans Pro', 'Fredoka One']
    }
});

const store = configureStore();


class App extends Component<{}, {}> {
	render() {
        return (
            <div>
                <Provider store={store}>
                <Router>
                    <Switch>
                        <AuthRoute
                            path="/login"
                            component={Login}
                        />
                        <PrivateRoute
                            path="/projects/:id/new-post"
                            component={NewPost}
                        />
                        <PrivateRoute
                            exact
                            path="/"
                            component={ProjectList}
                        />
						<AuthRoute
                            path="/signup"
                            component={Signup}
                        />
						<AuthRoute
							path='/additional'
							component={AdditionInfo}
						/>
						<AuthRoute
							path='/optional'
							component={Optional}
						/>
                        <PrivateRoute
                            path="/discover"
                            component={Discover}
                        />
                        <PrivateRoute
                            path="/projects/:id"
                            component={ProjectDetail}
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
    P
> {
    render() {
		const { component: Comp, ...rest } = this.props;

        const token = localStorage.getItem('token');
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
    P
> {
    render() {
		const { component: Comp, ...rest } = this.props;

        const token = localStorage.getItem('token');
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
