import React, { Component } from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';

class App extends Component<{}, {}> {
    render() {
        const token = localStorage.getItem('token');
        return (
            <div className={styles.App}>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            render={() => <Login token={token} />}
                        />
                        <Route path="/" render={() => <Main token={token} />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
