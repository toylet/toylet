import React from 'react';
import styles from './form.module.scss';

import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder: string;
    name?: string;
}

const InputForm: React.FC<Props> = ({ type, ...rest }) => {
    const passwordRule =
        type === 'password'
            ? {
                  maxLength: 32,
                  minLength: 8
              }
            : {};

    return (
        <input
            type={type}
            {...passwordRule}
            {...rest}
            className={classnames(styles.Form, rest.className)}
        />
    );
};

export default InputForm;
