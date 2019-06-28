import wretch from 'wretch'
import { string } from 'prop-types';
import { link } from 'fs';

const DOMAIN = 'http://localhost:8000';
const UNAUTh = 401;

// interface sign {
// 	email: string,
// 	password: string,
// 	name: string,
// 	job: string,
// 	language: string,
// 	link?: string[],
// 	profileImage: File
// }


const signin = (email: string, password: string) => {
	return wretch(`${DOMAIN}/api/v1/user/login`)
		.content('application/x-www-form-urlencoded')
		.post({email, password})
		.res(res => res.text)
}

const signup = (data: FormData) => {
	return wretch(`${DOMAIN}/api/v1/user/register`)
	.formData(data)
	.post()
	.res(res => res.text)
}

export {signin, signup}
