import styles from '../../NewPost.module.scss';
import { ReactComponent as GitHubIcon } from '../../../svgs/github.svg';
import * as React from 'react';

interface Props { onClick: () => void }
export default (props: Props) => (
    <div className={styles.connectGitHub} onClick={props.onClick}>
        <GitHubIcon />
        <span className={styles.connectGitHubText}>Connect Github Repo</span>
    </div>
);
