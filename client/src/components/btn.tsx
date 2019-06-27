import React from 'react';
import styles from './btn.module.scss'
import { ReactComponent as Arrow } from '../svgs/right-arrow.svg'

const btn: React.FC = () => {
	return (
		<button className={styles.button}>
			<Arrow/>
		</button>
	);
}

export default btn
