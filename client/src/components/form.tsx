import React from 'react';
import {onLoginSuccess} from '../auth'
import styles from './form.module.scss'

const InputForm: React.FC<{type: string, placeholder: string}> = ({type, placeholder}) => {
	// TODO: 유효성 검사
	// const [text, setText] = useState('')
	// const [isInvalid, setisInvalid] = useState(false)
	// eslint-disable-next-line
	const email = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
	// eslint-disable-next-line
	const password = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$'
	// Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.


	return (
		<input type={type}
		className={styles.Form}
		pattern={type==="email" ? email : password}
		onKeyDown={handler}
		placeholder={placeholder}/>
	)
}

const handler = (e: React.KeyboardEvent<HTMLInputElement>) => {
	if (e.keyCode === 13) {
		onLoginSuccess()
	}
}

export default InputForm
