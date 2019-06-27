const onLoginSuccess = () => {
	localStorage.setItem('token', 'something');
	window.location.href = '/';
};

export {onLoginSuccess}
