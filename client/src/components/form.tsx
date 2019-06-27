import React from 'react';
import styles from './form.module.scss'

const InputForm: React.FC<{type: string, placeholder: string}> = ({type, placeholder}) => {
	// TODO: 유효성 검사
	// const [text, setText] = useState('')
	// const [isInvalid, setisInvalid] = useState(false)
	const regex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'

	return (
		<input type={type}
		className={styles.Form}
		pattern={type==="email" ? regex : undefined}
		placeholder={placeholder}/>
	)
}

export default InputForm
