import * as React from 'react';
import styles from './ProjectList.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '../Sidebar';

const cx = classNames.bind(styles);

const SideLayout: React.FC = ({children}) => {
    return (
        <div className={cx('container')}>
            <Sidebar/>
            <div className={cx('subrouter')}>
                {children}
            </div>
        </div>
    );
};

export default SideLayout;
