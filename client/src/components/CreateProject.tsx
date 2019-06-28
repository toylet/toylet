import * as React from 'react';
import ReactModal from 'react-modal';
import * as lodash from 'lodash';

import { GooSpinner } from 'react-spinners-kit';

import { ReactComponent as Check } from '../svgs/icon-check.svg';
import Form from './form';

import styles from './CreateProject.module.scss';
import Select from './common/Select';
import Button from './common/Button';

import * as apis from '../apis';
import { toast } from 'react-toastify';

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
    text: string;
    repos: string[];
}

class CreateProject extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            valid: false,
            loading: false,
            text: '',
            repos: []
        };
    }

    onTextChange = (e: any) => {
        const tokenText = e.currentTarget.value;
        this.setState({
            text: tokenText,
            valid: false
        });
        reqId++;
        this.checkValidity(reqId);
    };

    onCreate = () => {
        apis.createProject({
            title: this.state.text,
            recuiting: 'dev',
            post: []
        }).then(() => {
            this.props.onRequestClose();
            toast.success('Project has successfully created!');
        });
    };

    checkValidity = lodash.debounce(id => {
        if (id === reqId && this.state.text.length < 19) {
            this.setState({ valid: true });
        }
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
                    <div className={styles.header}>Create Project</div>
                    <div className={styles.stepContainer}>
                        <div className={styles.stepText}>
                            1. Choose Your Project Name
                        </div>
                        {this.state.valid ? <Check /> : null}
                    </div>
                    <div className={styles.desc}>
                        Project name must less than 18 characters.
                    </div>
                    <Form
                        onChange={this.onTextChange}
                        className={styles.input}
                        type=""
                        placeholder="PROJECT NAME"
                    ></Form>
                    <div className={styles.stepContainer}>
                        <div className={styles.stepText}>
                            2. Choose Your Project Type
                        </div>
                    </div>
                    <div className={styles.desc}>
                        Is it DESIGN project? or DEVELOP project?
                    </div>
                    <div className={styles.selectGroup}>
                        <div>
                            <input
                                type="checkbox"
                                name="design"
                                value="Design"
                            />
                            Design
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="develop"
                                value="Develop"
                            />
                            Develop
                        </div>
                    </div>
                    <div className={styles.stepContainer}>
                        <div className={styles.stepText}>
                            3. How many days will you spare time for this
                            project per week?
                        </div>
                    </div>
                    <div className={styles.desc}>
                        Choose among the seven days.
                    </div>

                    <div className={styles.selectGroup}>
                        <div>
                            <input type="checkbox" name="Mon" value="Mon" />
                            Mon
                        </div>
                        <div>
                            <input type="checkbox" name="Tue" value="Tue" />
                            Tue
                        </div>
                        <div>
                            <input type="checkbox" name="Wed" value="Wed" />
                            Wed
                        </div>
                        <div>
                            <input type="checkbox" name="Thu" value="Thu" />
                            Thu
                        </div>
                        <div>
                            <input type="checkbox" name="Fri" value="Fri" />
                            Fri
                        </div>
                        <div>
                            <input type="checkbox" name="Sat" value="Sat" />
                            Sat
                        </div>
                        <div>
                            <input type="checkbox" name="Sun" value="Sun" />
                            Sun
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <Button
                            className={styles.button}
                            onClick={this.onCreate}
                        >
                            CREATE
                        </Button>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

export default CreateProject;
