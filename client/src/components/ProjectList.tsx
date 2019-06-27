import * as React from 'react';
import styles from './ProjectList.module.scss';
import { Link } from 'react-router-dom';

export default class ProjectList extends React.Component {
    logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    onClickLogout = () => {
        this.logout();
    };

    render() {
        const list = [
            {
                name: 'toylet/toylet',
                key: '1a3fbe'
            },
            {
                name: 'openhack design project',
                key: '1abe33'
            }
        ];

        return (
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <button onClick={this.onClickLogout}>logout</button>
                    <div>My Projects</div>
                    <button>Discover</button>
                </div>
                <div className={styles.projects}>
                    <div>
                        ProjectList
                        <ul>
                            {list.map(project => (
                                <li>
                                    <Link to={'/projects/' + project.key}>
                                        {project.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
