import * as React from 'react';
import Editor, { OnChange, Theme } from 'rich-markdown-editor';
import Avatar from 'react-avatar';

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
                                              <div
                                                  className={
                                                      styles.articleHeader
                                                  }
                                              >
                                                  <div
                                                      className={
                                                          styles.articleTextContainer
                                                      }
                                                  >
                                                      <span
                                                          className={
                                                              styles.articleTitle
                                                          }
                                                      >
                                                          {post.title}
                                                      </span>
                                                      <span
                                                          className={
                                                              styles.articleDate
                                                          }
                                                      >
                                                          July 29th, 2019
                                                      </span>
                                                  </div>
                                                  <Avatar
                                                      round
                                                      src={sampleCat}
                                                  ></Avatar>
                                              </div>
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

const sampleCat =
    "'data:image/jpeg;base64,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'";
