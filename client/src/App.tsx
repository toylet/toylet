import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    RouteProps,
    Redirect
} from 'react-router-dom';
import WebFont from 'webfontloader';
import Main from './components/Main';
import Login from './components/Login';
import Discover from './components/Discover';
import ProjectDetail from './components/ProjectDetail';
import Signup from './components/Signup/'


WebFont.load({
    google: {
        families: ['Source Sans Pro', 'Fredoka One']
    }
});

class App extends Component<{}, {}> {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <AuthRoute
                            path="/login"
                            component={Login}
                        />
						<AuthRoute
                            path="/signup"
                            component={Signup}
                        />
                        <PrivateRoute
                            path="/discover"
                            component={Discover}
                        />
                        <PrivateRoute
                            path="/projects/:id"
                            component={ProjectDetail}
                        />
                        <PrivateRoute
							exact path="/"
							component={Main}
						/>
                        <Redirect to="/" />
                    </Switch>
                </Router>
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
					console.log(token);
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
					console.log(token);
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
