import React, { Component } from 'react';
import { login } from '../../redux/actions/authentication';
import { ADMIN_LOGIN_USERNAME, ADMIN_LOGIN_PASSWORD, USER_LOGIN_USERNAME, USER_LOGIN_PASSWORD } from '../../constants/dummyData';
import { FORM_ERROR_MESSAGE, EMAIL_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from '../../constants/messages';
import { connect } from 'react-redux';

import './Login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			formErrors: {
				email: '',
				password: ''
			},
			emailValid: false,
			passwordValid: false,
			formValid: false,
			authenticationError: ''
		};
	};

	handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	validateForm = () => {
		const { email, password } = this.state;

		const emailValid = email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		const passwordValid = password.length >= 6;

		this.setState({
			formErrors: {
				email: emailValid ? '' : EMAIL_ERROR_MESSAGE,
				password: passwordValid ? '' : PASSWORD_ERROR_MESSAGE
			},
			emailValid: emailValid,
			passwordValid: passwordValid
		});

		return !!emailValid && passwordValid;
	}

	errorClass = (error) => {
		return (error.length === 0 ? '' : 'error');
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { email, password } = this.state;

		const isFormValid = this.validateForm();
		if (!isFormValid)
			return false;

		if ((email !== ADMIN_LOGIN_USERNAME || password !== ADMIN_LOGIN_PASSWORD)
			&& (email !== USER_LOGIN_USERNAME || password !== USER_LOGIN_PASSWORD)) {
			this.setState({
				authenticationError: FORM_ERROR_MESSAGE
			});
		} else {
			this.props.login({
				username: email,
				isAdmin: email === ADMIN_LOGIN_USERNAME
			});

			this.props.history.push("/");
			return true;
		}
	}

	render() {
		const { email, password, formErrors, authenticationError } = this.state;

		return (
			<div className="login-form">
				<form noValidate onSubmit={this.onSubmit}>
					<h3 className="main-header"> Please Sign In </h3>
					<div>
						<div className="error-block" style={{ color: 'red' }}>{authenticationError}</div>
					</div>
					<div className="form-field">
						<input
							type="email"
							name="email"
							className={`user-email ${this.errorClass(formErrors.email)}`}
							placeholder="Email"
							autoComplete="username"
							value={email}
							onChange={this.handleInputChange} />

						<div className="text-error" style={{ color: 'red' }}>{formErrors.email}</div>
					</div>
					<div className="form-field">
						<input
							type="password"
							name="password"
							className={`user-password ${this.errorClass(formErrors.password)}`}
							placeholder="Password"
							autoComplete="current-password"
							value={password}
							onChange={this.handleInputChange} />

						<div className="text-error" style={{ color: 'red' }}>{formErrors.password}</div>
					</div>
					<button type="submit" className="dws-submit">Sign in</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (user) => {
			dispatch(login(user))
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);