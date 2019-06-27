import * as React from 'react';
import ReactModal from 'react-modal';
import * as lodash from 'lodash';

import { ReactComponent as Check } from '../svgs/icon-check.svg';
import { GooSpinner } from 'react-spinners-kit';
import Form from './form';

import styles from './GitHubConnect.module.scss';
import Select from './Select';
import Button from './Button';

const customStyle = {
    content: { top: 0, left: 0, width: '50%' }
};

let reqId = 0;

class GitHubConnect extends React.Component<
    {},
    { valid: boolean; loading: boolean; tokenText: string }
> {
    constructor(props: {}) {
        super(props);

        this.state = {
            valid: false,
            loading: false,
            tokenText: ''
        };
    }

    onTextChange = (e: any) => {
        this.setState({
            tokenText: e.currentTarget.value,
            valid: false
        });
        if (!e.currentTarget.value) return;

        this.setState({ loading: true });
        reqId++;
        this.checkValidity();
    };

    onConnect = () => {};

    checkValidity = lodash.debounce(() => {
        const id = reqId;
        // TODO:: Replace with the actual API
        setTimeout(() => {
            if (reqId === id) this.setState({ valid: true, loading: false });
        }, 1000);
    }, 250);

    render() {
        return (
            // @ts-ignore
            <ReactModal
                isOpen={true}
                className={styles.content}
                overlayClassName={styles.overlay}
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
                            <option>ASDF</option>
                            <option>asdf</option>
                        </Select>
                    )}
                    <div className={styles.footer}>
                        <Button className={styles.button} onClick={this.onConnect}>CONNECT</Button>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

export default GitHubConnect;
