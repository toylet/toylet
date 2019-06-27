import * as React from 'react';
import styles from './MyProjects.module.scss';
import { RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import {
    endRequestProjectList,
    requestProjectList,
    selectProject,
    setProjectList
} from '../../store/project/actions';
import { Project } from '../../store/project/types';

type Props = RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof actions;

class MyProjects extends React.Component<Props> {
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
                <div className={styles.projects}>
                    <div>
                        <h1 className="section-title">My Projects</h1>
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
)(MyProjects);
