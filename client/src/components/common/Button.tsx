import * as React from 'react';
import styles from './Button.module.scss';
import { PropsWithChildren, HTMLAttributes } from 'react';
import classnames from 'classnames';

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default ({ children, ...rest }: Props) => {
    return (
        <div {...rest} className={classnames(rest.className, styles.button)}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};
