import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../store';
import { connect } from 'react-redux';
import * as apis from '../apis';
import { selectProject } from '../store/project/actions';

type Props = RouteComponentProps<{ id: string }>;

class ProjectList extends React.Component<
    Props & ReturnType<typeof mapStateToProps> & typeof mapDispatch
> {
    componentDidMount(): void {
        if (!this.props.project) {
            // TODO:: fetch project detail from the endpoint
            apis.getProductDetail(this.props.match.params.id).then(project => {
                this.props.selectProject(project);
            });
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
        project: proj && props.match.params.id === proj._id ? proj : undefined
    };
}

const mapDispatch = { selectProject };

export default connect(
    mapStateToProps,
    mapDispatch
)(ProjectList);
