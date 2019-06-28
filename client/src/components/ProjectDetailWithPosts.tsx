import * as React from 'react';
import Editor, { OnChange, Theme } from 'rich-markdown-editor';

import ConnectGitHubButton from './common/ConnectGitHubButton';

import GitHubConnect from './GitHubConnect';

import { ReactComponent as DownloadIcon } from '../svgs/download.svg';
import { ReactComponent as GitHubIcon } from '../svgs/github.svg';
import { ReactComponent as TipIcon } from '../svgs/tip.svg';

import styles from './NewPost.module.scss';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { addPostToProject, selectProject } from '../store/project/actions';
import { RouteComponentProps } from 'react-router';

import * as apis from '../apis';

const colors = {
    almostBlack: '#181A1B',
    lightBlack: '#2F3336',
    almostWhite: '#E6E6E6',
    white: '#FFF',
    white10: 'rgba(255, 255, 255, 0.1)',
    black: '#000',
    black10: 'rgba(0, 0, 0, 0.1)',
    primary: '#1AB6FF',
    greyLight: '#F4F7FA',
    grey: '#E8EBED',
    greyMid: '#9BA6B2',
    greyDark: '#DAE1E9'
};

export const base = {
    ...colors,
    fontFamily: "'Source Sans Pro', sans-serif;",
    fontFamilyMono:
        "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
    fontWeight: 400,
    link: colors.primary,
    placeholder: '#B1BECC',
    textSecondary: '#4E5C6E',
    textLight: colors.white,
    selected: colors.primary,
    codeComment: '#6a737d',
    codePunctuation: '#5e6687',
    codeNumber: '#d73a49',
    codeProperty: '#c08b30',
    codeTag: '#3d8fd1',
    codeString: '#032f62',
    codeSelector: '#6679cc',
    codeAttr: '#c76b29',
    codeEntity: '#22a2c9',
    codeKeyword: '#d73a49',
    codeFunction: '#6f42c1',
    codeStatement: '#22a2c9',
    codePlaceholder: '#3d8fd1',
    codeInserted: '#202746',
    codeImportant: '#c94922'
};

export const light: Theme = {
    ...base,
    background: colors.white,
    text: '#0c1c2d',
    code: colors.lightBlack,

    toolbarBackground: colors.lightBlack,
    toolbarInput: colors.white10,
    toolbarItem: colors.white,

    blockToolbarBackground: colors.greyLight,
    blockToolbarTrigger: colors.greyMid,
    blockToolbarTriggerIcon: colors.white,
    blockToolbarItem: colors.almostBlack,

    tableDivider: colors.grey,
    tableSelected: colors.primary,
    tableSelectedBackground: '#E5F7FF',

    quote: colors.greyDark,
    codeBackground: colors.greyLight,
    codeBorder: colors.grey,
    horizontalRule: colors.grey,
    imageErrorBackground: colors.greyLight
};

type Props = RouteComponentProps<{ id: string }>;
type ExtendedProps = Props &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatch;

class ProjectDetailWithPosts extends React.Component<
    ExtendedProps,
    { title: string; body: string; isConnected: boolean; isModalOpen: boolean }
> {
    constructor(props: ExtendedProps) {
        super(props);

        this.state = {
            title: '',
            body: '',
            isConnected: false,
            isModalOpen: false
        };
    }

    componentDidMount(): void {
        if (!this.props.project) {
            // TODO:: fetch project detail from the endpoint
            apis.getProductDetail(this.props.match.params.id).then(project => {
                this.props.selectProject(project);
            });
        }
    }

    onModalClose = () => {
        this.setState({ isModalOpen: false });
    };

    onClickGitHubConnect = () => {
        this.setState({
            isModalOpen: true
        });
    };

    onClickSave = () => {
        this.props.history.push(
            `/projects/${this.props.match.params.id}/new-post`
        );
    };

    render() {
        const project = this.props.project;

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTextContainer}>
                        <span className={styles.headerTextInput}>
                            {project ? project.title : 'Project Name'}
                        </span>
                        <span className={styles.headerTextDate}>
                            All (Design + Develop) | Hannah Baker, Steven Lovett
                            and Michael Santana
                        </span>
                        <div
                            onClick={this.onClickSave}
                            className={styles.saveButton}
                        >
                            <DownloadIcon className={styles.saveIcon} />
                            <span className={styles.saveText}>WRITE</span>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.editPanel}>
                        {this.props.posts
                            ? this.props.posts.map(post => {
                                  return (
                                      <div className={styles.post}>
                                          <div className={styles.editor}>
                                              <Editor
                                                  defaultValue={post.body}
                                                  readOnly
                                                  theme={light}
                                              />
                                          </div>
                                          {this.state.isConnected ? (
                                              <CommitHistory />
                                          ) : null}
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                    <GitHubConnect
                        isOpen={this.state.isModalOpen}
                        onRequestClose={this.onModalClose}
                    />
                    <div className={styles.sidebar}>
                        {/* TODO:: Connected repository information */}
                        {!this.state.isConnected ? (
                            /* TODO:: Replace with real connecting interface*/
                            <ConnectGitHubButton
                                onClick={this.onClickGitHubConnect}
                            />
                        ) : null}
                        <Tips />
                    </div>
                </div>
            </div>
        );
    }
}

const Tips = () => (
    <div className={styles.tips}>
        <div className={styles.tipIcon}>
            <TipIcon />
        </div>
        <span className={styles.tipTitle}>Logging tips</span>
        <div className={styles.tipPoint}>1. Works Done</div>
        <span className={styles.tipDesc}>
            What were the tasks you've done today?
        </span>
        <div className={styles.tipPoint}>2. Issues</div>
        <span className={styles.tipDesc}>
            What were the problems or difficulties of doing today's project?
        </span>
        <div className={styles.tipPoint}>3. To-do</div>
        <span className={styles.tipDesc}>What should you do next?</span>
    </div>
);

const CommitHistory = () => {
    return (
        <div className={styles.history}>
            <GitHubIcon
                className={styles.githubBlackIcon}
                style={{ fill: 'black' }}
            />
            <span className={styles.historyTitle}>
                Today’s Commit Histories
            </span>
        </div>
    );
};

function mapStateToProps(state: AppState, props: Props) {
    const proj = state.project.selectedProject;
    const project =
        proj && props.match.params.id === proj._id ? proj : undefined;
    return {
        project,
        posts: project && project.posts.map(post => JSON.parse(post)).reverse()
    };
}

const mapDispatch = { selectProject };

export default connect(
    mapStateToProps,
    mapDispatch
)(ProjectDetailWithPosts);
