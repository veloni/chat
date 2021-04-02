import React, { useState, useEffect } from 'react';

import { getDataFromLocalStorage, setDataFromLocalStorage } from '../helper';

import './Autorization.scss';

const Autorization = ({ autorizaton, setAutorizaton }) => {
	const [isSubmited, setIsSubmited] = useState(false);
	const [loginValue, setLoginValue] = useState('admin');
	const [passwordValue, setPasswordValue] = useState('admin');

	useEffect(() => {
		const localLogin = getDataFromLocalStorage('userLogin');
		const localPassword = getDataFromLocalStorage('userPassword');

		if (localLogin !== loginValue && localPassword !== passwordValue) { return; };

		setAutorizaton(true);
 	});

  const checkLoginPass = () => {
		const isLoginCorrect = loginValue === 'admin';
		const isPasswordCorrect = passwordValue === 'admin';
		const isAutorizationPassed = isLoginCorrect && isPasswordCorrect;

		setIsSubmited(true);

		if (!isAutorizationPassed) { return; }

		setDataFromLocalStorage('userLogin', loginValue);  
		setDataFromLocalStorage('userPassword', passwordValue);  
		setDataFromLocalStorage('entranceDone', true)

    setAutorizaton(true);
  };

	const handleLoginChange = (value) => {
		setIsSubmited(false);
		setLoginValue(value);
	};

	const handlePasswordChange = (value) => {
		setIsSubmited(false);
		setPasswordValue(value);
	};

	const isWarningMessageVisible = isSubmited && !autorizaton;

	return (
		<div className="wrapper-autorization">
			<div className="box-autorization">
				<span className="title-autorization">
					Autorization
				</span>
				{isWarningMessageVisible && <span className="message">
					incorect login or password
				</span>}
				<div className="wrapper-login-password">
					<div className="wrapper-login">
						<span className="text-autoriztion">
							login
						</span>
						<input
							className="input-login"
							defaultValue={loginValue}
							onChange={(e) => handleLoginChange(e.target.value)}
						>
						</input>
					</div>
					<div className="wrapper-password">
					<span className="text-autoriztion">
							password
						</span>
						<input
							className="input-password"
							defaultValue={passwordValue}
							onChange={(e) => handlePasswordChange(e.target.value)}
						>
						</input>
					</div>
					<button
						className="autorization"
						onClick={() => checkLoginPass()}
					>
					login
				</button>
				</div>
			</div>
		</div>
	);
};

export default Autorization;