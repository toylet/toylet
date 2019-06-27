import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login/';
import Signup from './components/Signup/'

class App extends Component<{}, {}> {
    render() {
        const token = localStorage.getItem('token');
        return (
            <div>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            render={() => <Login token={token} />}
                        />
						<Route path="/signup" exact component={Signup} />
                        <Route path="/" render={() => <Main token={token} />} />
                    </Switch>
					
                </Router>
            </div>
        );
    }
}

export default App;
