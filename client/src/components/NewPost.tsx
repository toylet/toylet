import * as React from 'react';
import Editor, { OnChange, Theme } from 'rich-markdown-editor';

import GitHubConnect from './GitHubConnect';

import { ReactComponent as DownloadIcon } from '../svgs/download.svg';
import { ReactComponent as GitHubIcon } from '../svgs/github.svg';
import { ReactComponent as TipIcon } from '../svgs/tip.svg';

import styles from './NewPost.module.scss';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { addPostToProject } from '../store/project/actions';
import { RouteComponentProps } from 'react-router';

import * as apis from '../apis';

const markdownTemplate = `
# Summary
## Task 1

Write your task's description

# Next Day TODOs
- A
- B
- C
`;

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

type Props = RouteComponentProps<{ id: string }> &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatch;

class NewPost extends React.Component<
    Props,
    { title: string; body: string; isConnected: boolean; isModalOpen: boolean }
> {
    constructor(props: Props) {
        super(props);

        this.state = {
            title: '',
            body: markdownTemplate,
            isConnected: false,
            isModalOpen: false
        };
    }

    componentDidMount(): void {
        if (!this.props.project)
            this.props.history.push('/projects/' + this.props.match.params.id);
    }

    // TODO:: debounce
    onChange: OnChange = value => {
        this.setState({ body: value() });
    };

    onModalClose = () => {
        this.setState({ isModalOpen: false });
    };

    onClickGitHubConnect = () => {
        this.setState({
            isModalOpen: true
        });
    };

    // shit code
    onClickSave = () => {
        if (!this.props.project) return;

        const { _id: id } = this.props.project;

        const payload = { title: this.state.title, body: this.state.body };
        console.log('proj before', this.props.project);
        this.props.addPostToProject(payload);
        // TODO:: Use thunk :O
        setTimeout(() => {
            if (!this.props.project) return;

            apis.updateProject(id, this.props.project);
            console.log('proj after', this.props.project);

            this.props.history.push('/projects/' + id);
        }, 0);
    };

    onTitleChange = (e: any) => {
        this.setState({ title: e.currentTarget.value });
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTextContainer}>
                        <input
                            onChange={this.onTitleChange}
                            className={styles.headerTextInput}
                            placeholder="Title"
                        />
                        <span className={styles.headerTextDate}>
                            June 27, 2019 | Beomjun Gil @Affect Script
                        </span>
                        <div
                            onClick={this.onClickSave}
                            className={styles.saveButton}
                        >
                            <DownloadIcon className={styles.saveIcon} />
                            <span className={styles.saveText}>SAVE</span>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.editPanel}>
                        <div className={styles.editor}>
                            <Editor
                                onChange={this.onChange}
                                uploadImage={mockUploadFunc}
                                defaultValue={markdownTemplate}
                                theme={light}
                            />
                        </div>
                        {this.state.isConnected ? <CommitHistory /> : null}
                    </div>
                    <GitHubConnect
                        isOpen={this.state.isModalOpen}
                        onRequestClose={this.onModalClose}
                    />
                    <div className={styles.sidebar}>
                        {/* TODO:: Connected repository information */}
                        {!this.state.isConnected ? (
                            /* TODO:: Replace with real connecting interface*/
                            <div
                                className={styles.connectGitHub}
                                onClick={this.onClickGitHubConnect}
                            >
                                <GitHubIcon />
                                <span className={styles.connectGitHubText}>
                                    Connect Github Repo
                                </span>
                            </div>
                        ) : null}
                        <Tips />
                    </div>
                </div>
            </div>
        );
    }
}

const mockUploadFunc = async (file: File) => {
    return new Promise<string>(resolve => {
        setTimeout(() => {
            resolve(URL.createObjectURL(file));
        }, 4000);
    });
};

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

function mapStateToProps(state: AppState) {
    return { project: state.project.selectedProject };
}

const mapDispatch = {
    addPostToProject
};

export default connect(
    mapStateToProps,
    mapDispatch
)(NewPost);
