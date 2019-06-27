import * as React from 'react';
import { PropsWithChildren, SelectHTMLAttributes } from 'react';

import styles from './Select.module.scss';
import classnames from 'classnames';

interface Props
    extends PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>> {}

export default (props: Props) => {
    return (
        <select
            {...props}
            className={classnames(styles.select, props.className)}
        >
            {props.children}
        </select>
    );
};
