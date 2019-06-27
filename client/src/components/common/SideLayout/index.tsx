import * as React from 'react';
import styles from './SideLayout.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '../Sidebar';

const cx = classNames.bind(styles);

const SideLayout: React.FC = ({children}) => (
    <div className={cx('container')}>
        <Sidebar/>
        <div className={cx('subrouter')}>
            {children}
        </div>
    </div>
);

export default SideLayout;
