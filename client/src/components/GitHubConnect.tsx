import * as React from 'react';
import ReactModal from 'react-modal';
import * as lodash from 'lodash';

import { GooSpinner } from 'react-spinners-kit';

import { ReactComponent as Check } from '../svgs/icon-check.svg';
import Form from './form';

import styles from './GitHubConnect.module.scss';
import Select from './common/Select';
import Button from './common/Button';

import * as apis from '../apis';

const customStyle = {
    content: { top: 0, left: 0, width: '50%' }
};

let reqId = 0;

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface State {
    valid: boolean;
    loading: boolean;
    tokenText: string;
    repos: string[];
}

class GitHubConnect extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            valid: false,
            loading: false,
            tokenText: '',
            repos: []
        };
    }

    onTextChange = (e: any) => {
        const tokenText = e.currentTarget.value;
        this.setState({
            tokenText,
            valid: false
        });
        if (!tokenText) return;

        this.setState({ loading: true });
        reqId++;
        this.checkValidity(tokenText);
    };

    onConnect = () => {};

    checkValidity = lodash.debounce(gitToken => {
        const id = reqId;

        apis.userrepo(gitToken).then((repos: string[] | undefined) => {
            if (reqId === id) {
                this.setState({ valid: Boolean(repos), loading: false });
                if (repos) {
                    this.setState({ repos });
                }
            }
        });
    }, 250);

    render() {
        return (
            // @ts-ignore
            <ReactModal
                isOpen={this.props.isOpen}
                className={styles.content}
                overlayClassName={styles.overlay}
                shouldCloseOnOverlayClick
                onRequestClose={this.props.onRequestClose}
            >
                <div className={styles.container}>
                    <div className={styles.header}>Connect GitHub</div>
                    <div className={styles.stepContainer}>
                        <div className={styles.stepText}>
                            1. Generate a GitHub Personal Token
                        </div>
                        {this.state.valid ? <Check /> : null}
                    </div>
                    <div className={styles.desc}>
                        Click{' '}
                        <a
                            href="https://github.com/settings/tokens"
                            target="_blank"
                        >
                            here
                        </a>{' '}
                        to create a new token. You should{' '}
                        <strong>allow all the repository permissions</strong>
                    </div>
                    <Form
                        onChange={this.onTextChange}
                        className={styles.input}
                        type=""
                        placeholder="COPY AND PASTE YOUR TOKEN"
                    ></Form>
                    <div className={styles.stepContainer}>
                        <div className={styles.stepText}>
                            2. Select the repository
                        </div>
                    </div>
                    <div className={styles.desc}>
                        Select one repository that you want to integrate with
                    </div>
                    {this.state.loading ? (
                        <div className={styles.spinner}>
                            <GooSpinner color="#63aeff" />
                        </div>
                    ) : (
                        <Select
                            className={styles.input}
                            disabled={!this.state.valid}
                        >
                            {this.state.repos.map(repo => {
                                return <option>{repo}</option>;
                            })}
                        </Select>
                    )}
                    <div className={styles.footer}>
                        <Button
                            className={styles.button}
                            onClick={this.onConnect}
                        >
                            CONNECT
                        </Button>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

export default GitHubConnect;
