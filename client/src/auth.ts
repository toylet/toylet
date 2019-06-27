export function onLoginSuccess (history: any) {
	localStorage.setItem('token', 'something');
	history.push('/');
};
