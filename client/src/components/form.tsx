import React from 'react'
import styles from './form.module.scss'

const InputForm: React.FC<{type: string, placeholder: string, onChange?: React.ChangeEventHandler}> = ({type, placeholder, ...rest}) => {

const passwordRule = type === 'email' ? {} : {
	maxLength: 32,
	minLength: 8,
}

	return (
		<input type={type}
		className={styles.Form}
		placeholder={placeholder}
		{...passwordRule}
		{...rest}
		/>
	)
}

export default InputForm
