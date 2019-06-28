import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    RouteProps,
    Redirect,
    RouteComponentProps
} from 'react-router-dom';
import WebFont from 'webfontloader';
import Login from './components/Login';
import Discover from './components/Discover';
import Signup from './components/Signup/';
import AdditionInfo from './components/AdditionInfo';
import Optional from './components/Optional';
import MyProjects from './components/MyProjects';
import NewPost from './components/NewPost';
import { Provider } from 'react-redux';
import configureStore from './store';
import SideLayout from './components/common/SideLayout';

import * as apis from './apis';
import ProjectDetailWithPosts from './components/ProjectDetailWithPosts';

WebFont.load({
    google: {
        families: ['Source Sans Pro:400,600,700', 'Fredoka One']
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
                            <AuthRoute path="/login" component={Login} />
                            <PrivateRoute
                                path="/projects/:id/new-post"
                                component={NewPost}
                            />
                            <PrivateRoute
                                exact
                                path="/"
                                component={MyProjects}
                                useSideLayout
                            />
                            <AuthRoute path="/signup" component={Signup} />
                            <AuthRoute
                                path="/additional"
                                component={AdditionInfo}
                            />
                            <AuthRoute path="/optional" component={Optional} />
                            <PrivateRoute
                                path="/discover"
                                component={Discover}
                                useSideLayout
                            />
                            <PrivateRoute
                                path="/projects/:id"
                                component={ProjectDetailWithPosts}
                            />
                            <Redirect to="/" />
                        </Switch>
                    </Router>
                </Provider>
            </div>
        );
    }
}

class AuthRoute<P extends RouteProps = RouteProps> extends Component<P> {
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

interface PrivateRouteProps extends RouteProps {
    useSideLayout?: boolean;
}

class PrivateRoute<
    P extends PrivateRouteProps = PrivateRouteProps
> extends Component<P> {
    render() {
        const { component: Comp, useSideLayout, ...rest } = this.props;

        const token = localStorage.getItem('token');
        if (token) apis.setToken(token);

        const renderComponent = (props: RouteComponentProps<any>) => {
            if (!token) {
                return <Redirect to={'/login'} />;
            }

            if (useSideLayout) {
                return (
                    <SideLayout>
                        {
                            // @ts-ignore
                            <Comp {...props} />
                        }
                    </SideLayout>
                );
            }

            // @ts-ignore
            return <Comp {...props} />;
        };

        return <Route {...rest} render={renderComponent} />;
    }
}

export default App;
