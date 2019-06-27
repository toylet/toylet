import React from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import {ReactComponent as ToyletLogo} from '../../../svgs/logo.svg';
import {ReactComponent as MyProjectsIcon} from '../../../svgs/icon-myprojects.svg';
import {ReactComponent as DiscoverIcon} from '../../../svgs/icon-discover.svg';
import {ReactComponent as HallofBest} from '../../../svgs/icon-hallofbest.svg';
import {NavLink, NavLinkProps} from "react-router-dom";

const cx = classNames.bind(styles);
const defaultNavProps: Pick<NavLinkProps, 'activeClassName' | 'className' | 'exact'> = {
    activeClassName: cx('active'),
    className: cx('sidebar-menuitem'),
    exact: true,
};

const Sidebar: React.FC = () => (
    <div className={cx('sidebar-wrapper')}>
        <div>
            <div className={cx('sidebar-header')}>
                <ToyletLogo className={cx('sidebar-logo')}/>
                <div className={cx('sidebar-profile')}/>
            </div>
            <div className={cx('sidebar-menu-item-wrapper')}>
                <NavLink
                    to="/"
                    {...defaultNavProps}
                >
                    <MyProjectsIcon/>
                    My Projects
                </NavLink>
                <NavLink
                    to="/discover"
                    {...defaultNavProps}
                >
                    <DiscoverIcon/>
                    Discover Projects
                </NavLink>
                <NavLink
                    to="/hallofbest"
                    {...defaultNavProps}
                >
                    <HallofBest/>
                    Hall of Best Toyler
                </NavLink>
            </div>
        </div>
        <div>
            <a className={cx('sidebar-link')}>Logout</a>
            <a className={cx('sidebar-link')}>About Toylet</a>
            <a className={cx('sidebar-link')}>Open source licenses</a>
        </div>
    </div>
);

export default Sidebar;
