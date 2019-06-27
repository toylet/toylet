import * as React from 'react';
import styles from './MyProjects.module.scss';
import {RouteComponentProps} from 'react-router-dom';
import {AppState} from '../../store';
import {connect} from 'react-redux';
import {
    endRequestProjectList,
    requestProjectList,
    selectProject,
    setProjectList
} from '../../store/project/actions';
import {Project} from '../../store/project/types';
import ProjectCard from "../common/ProjectCard";
import classNames from 'classnames/bind';

import * as apis from '../../apis';

const cx = classNames.bind(styles);

type Props = RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof actions;

class MyProjects extends React.Component<Props> {
    componentDidMount(): void {
        this.props.requestProjectList();
        apis.projectList().then(list => {
            this.props.setProjectList(
                list,
                0
            );
            this.props.endRequestProjectList();
        });
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    onClickLogout = () => {
        this.logout();
    };

    onSelectProject = (project: Project) => {
        return () => {
            this.props.selectProject(project);
            this.props.history.push('/projects/' + project._id);
        }
    };

    render() {
        return (
            <div className={cx('container')}>
                <h1 className={cx('section-title', 'projects-title')}>My Projects</h1>
                {
                    this.props.loading
                        ? (
                            <span>loading</span>
                        )
                        : (
                            <div className={cx('card-wrapper')}>
                                {
                                    this.props.list.map(project => (
                                        <ProjectCard
                                            onClick={this.onSelectProject(project)}
                                            project={project}
                                        />
                                    ))
                                }
                            </div>

                        )}
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
