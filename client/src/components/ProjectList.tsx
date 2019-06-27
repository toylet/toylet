import * as React from 'react';
import styles from './ProjectList.module.scss';
import { Link } from 'react-router-dom';
import { AppState } from '../store';
import { connect } from 'react-redux';
import {
    endRequestProjectList,
    requestProjectList,
    setProjectList
} from '../store/project/actions';

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

class ProjectList extends React.Component<Props> {
    componentDidMount(): void {
        this.props.requestProjectList();
        setTimeout(() => {
            this.props.setProjectList(
                [
                    {
                        id: '123213',
                        title: 'Damn Project'
                    },
                    {
                        id: '3itmf309',
                        title: 'Super Project'
                    }
                ],
                0
            );
            this.props.endRequestProjectList();
        }, 1400);
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    onClickLogout = () => {
        this.logout();
    };

    render() {
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
                            {this.props.loading ? (
                                <span>loading</span>
                            ) : (
                                this.props.list.map(project => (
                                    <li>
                                        <Link to={'/projects/' + project.id}>
                                            {project.title}
                                        </Link>
                                    </li>
                                ))
                            )}

                            {}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        list: state.project.ids.map(id => state.project.byId[id]),
        page: state.project.page,
        loading: state.project.loading
    };
}

const actions = { setProjectList, requestProjectList, endRequestProjectList };

export default connect(
    mapStateToProps,
    actions
)(ProjectList);
