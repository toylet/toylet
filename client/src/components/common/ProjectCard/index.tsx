import React from 'react';
import { Project } from '../../../store/project/types';
import classNames from 'classnames/bind';
import styles from './ProjectCard.module.scss';
import { ReactComponent as WroteIcon } from '../../../svgs/icon-wrote.svg';
import { ReactComponent as ShouldWriteIcon } from '../../../svgs/icon-should-write.svg';
import { ReactComponent as NoneIcon } from '../../../svgs/icon-none.svg';
import { ReactComponent as PlusIcon } from '../../../svgs/plus.svg';

interface ProjectCardProps {
    project: Project;
    onClick: React.MouseEventHandler;
}

const cx = classNames.bind(styles);

const StatusBall: React.FC<{ status: 'wrote' | 'shouldWrite' | 'none' }> = ({
    status
}) => {
    switch (status) {
        case 'wrote': {
            return <WroteIcon />;
        }
        case 'shouldWrite': {
            return <ShouldWriteIcon />;
        }
        default: {
            return <NoneIcon />;
        }
    }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, ...rest }) => (
    <div className={cx('project-card')} {...rest}>
        <div>
            <h3 className={cx('project-card-title')}>{project.title}</h3>
            <p className={cx('project-card-type')}>{project.title}</p>
        </div>

        <div className={cx('project-card-meta')}>
            <div>
                <div>
                    <p className={cx('project-card-label')}>Last updated</p>
                    <p className={cx('project-card-value')}>2019. 06. 29</p>
                </div>
                <div>
                    <p className={cx('project-card-label')}>This week</p>
                    <p className={cx('project-card-value')}>3 / 3</p>
                </div>
            </div>
            <StatusBall status="wrote" />
        </div>
    </div>
);

interface AddCardProp {
    onClick: React.MouseEventHandler;
}

const AddProjectCard: React.FC<AddCardProp> = ({ ...rest }) => (
    <div className={cx('blue-card')} {...rest}>
        <PlusIcon className={cx('plus-icon')}/>
    </div>
);

export { AddProjectCard };

export default ProjectCard;
