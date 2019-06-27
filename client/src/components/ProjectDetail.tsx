import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../store';
import { connect } from 'react-redux';

type Props = RouteComponentProps<{ id: string }>;

class ProjectList extends React.Component<
    Props & ReturnType<typeof mapStateToProps>
> {
    componentDidMount(): void {
        if (!this.props.project) {
            // TODO:: fetch project detail from the endpoint
        }
    }

    render() {
        const { match, project } = this.props;

        return (
            <div>
                <h1>
                    {project
                        ? project.title
                        : 'Project not loaded or not existing'}
                </h1>
                <Link to={`/projects/${match.params.id}/new-post`}>
                    New Post
                </Link>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, props: Props) {
    const proj = state.project.selectedProject;

    return {
        project: proj && props.match.params.id === proj.id ? proj : undefined
    };
}

export default connect(
    mapStateToProps,
    {}
)(ProjectList);
