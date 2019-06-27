import * as React from 'react';
import styles from './Discover.module.scss';
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

const cx = classNames.bind(styles);

type Props = RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof actions;

class Discover extends React.Component<Props> {
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
                    },
                    {
                        id: '1231234',
                        title: 'Super P12312roject'
                    },
                    {
                        id: '123123',
                        title: 'Super P12312roject'
                    }
                ],
                0
            );
            this.props.endRequestProjectList();
        }, 1400);
    }

    onSelectProject = (project: Project) => {
        return () => {
            this.props.selectProject(project);
            this.props.history.push('/projects/' + project.id);
        }
    };

    render() {
        return (
            <div className={cx('container')}>
                <h1 className={cx('section-title', 'projects-title')}>Discover Projects</h1>
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
)(Discover);
