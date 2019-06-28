import * as React from 'react';
import { PropsWithChildren, SelectHTMLAttributes } from 'react';

import { ReactComponent as DownArrow } from '../../svgs/icon-downarrow.svg';

import styles from './Select.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface Props
    extends PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>> {}

export default (props: Props) => {
    return (
        <div className={styles.container}>
            <select
                id="select"
                {...props}
                className={cx('select', props.className)}
            >
                {props.children}
            </select>
            <label className={styles.arrow} htmlFor="select">
                <DownArrow width={28} />
            </label>
        </div>
    );
};
