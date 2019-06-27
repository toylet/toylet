import * as React from 'react';
import styles from './ProjectList.module.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../store';
import { connect } from 'react-redux';
import {
    endRequestProjectList,
    requestProjectList,
    selectProject,
    setProjectList
} from '../store/project/actions';
import { Project } from '../store/project/types';

type Props = RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof actions;

class ProjectList extends React.Component<Props> {
    componentDidMount(): void {
        this.props.requestProjectList();

        // TODO:: Replace the mock fetch with the actual API fetch
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

    onSelectProject = (project: Project) => {
        this.props.selectProject(project);
        this.props.history.push('/projects/' + project.id);
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
                                        <a
                                            onClick={() =>
                                                this.onSelectProject(project)
                                            }
                                        >
                                            {project.title}
                                        </a>
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

const actions = {
    setProjectList,
    requestProjectList,
    endRequestProjectList,
    selectProject
};

export default connect(
    mapStateToProps,
    actions
)(ProjectList);
