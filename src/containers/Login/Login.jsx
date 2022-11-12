import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	ADMIN_LOGIN_USERNAME,
	ADMIN_LOGIN_PASSWORD,
	USER_LOGIN_USERNAME,
	USER_LOGIN_PASSWORD
} from '../../constants/dummyData';
import {
	EMAIL_ERROR_MESSAGE,
	PASSWORD_ERROR_MESSAGE,
	FORM_ERROR_MESSAGE
} from '../../constants/messages';

import { login } from '../../redux/actions/authentication';

import './Login.css';

const Login = () => {
	const [inputValues, setInputValues] = useState({ email: '', password: '' });
	const [formErrors, setFormErrors] = useState({ emailError: '', passwordError: '' });
	const [authenticationError, setAuthenticationError] = useState('');

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleInputChange = ({ target }) => {
		const { name, value } = target;
		setInputValues((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const validateForm = () => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const emailValid = inputValues.email.match(regex);
		const isPasswordValid = inputValues.password.length >= 6;

		setFormErrors((prevState) => ({
			...prevState,
			emailError: emailValid ? '' : EMAIL_ERROR_MESSAGE,
			passwordError: isPasswordValid ? '' : PASSWORD_ERROR_MESSAGE,
		}));

		return !!emailValid && isPasswordValid;
	};

	const errorClass = (error) => {
		return (error?.length === 0 ? '' : 'error');
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const isFormValid = validateForm();

		if (!isFormValid)
			return false;

		if ((inputValues.email !== ADMIN_LOGIN_USERNAME || inputValues.password !== ADMIN_LOGIN_PASSWORD)
			&& (inputValues.email !== USER_LOGIN_USERNAME || inputValues.password !== USER_LOGIN_PASSWORD)) {
			setAuthenticationError(FORM_ERROR_MESSAGE);
		} else {
			dispatch(login({
				username: inputValues.email,
				isAdmin: inputValues.email === ADMIN_LOGIN_USERNAME
			}))

			navigate("/");
			return true;
		}
	};

	return (
		<div className="login-form">
			<form noValidate onSubmit={onSubmit}>
				<h3 className="main-header">Please Sign In</h3>
				<div>
					<div className="error-block" style={{ color: 'red' }}>{authenticationError}</div>
				</div>
				<div className="form-field">
					<input
						type="email"
						name="email"
						className={`user-email ${errorClass(formErrors.emailError)}`}
						placeholder="Email"
						value={inputValues.email}
						autoComplete="username"
						onChange={handleInputChange}
					/>
					<div className="text-error" style={{ color: 'red' }}>{formErrors.emailError}</div>
				</div>
				<div className="form-field">
					<input
						type="password"
						name="password"
						className={`user-password ${errorClass(formErrors.passwordError)}`}
						placeholder="Password"
						value={inputValues.password}
						autoComplete="current-password"
						onChange={handleInputChange}
					/>
					<div className="text-error" style={{ color: 'red' }}>{formErrors.passwordError}</div>
				</div>
				<button type="submit" className="dws-submit">Sign in</button>
			</form>
		</div>
	);
};

export default Login;