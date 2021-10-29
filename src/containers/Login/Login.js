import React, { Component } from 'react';
import FormErrors from '../../components/FormErrors';
import { login } from '../../redux/actions/authentication';
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

		const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		const passwordValid = password.length >= 6;

		this.setState({
			formErrors: {
				email: emailValid ? '' : 'Email is invalid.',
				password: passwordValid ? '' : 'Password is too short.'
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
		const { email, password } = this.state;

		e.preventDefault();

		const isFormValid = this.validateForm();
		if(!isFormValid)
			return false;

		const adminLoginUsername = 'admin.ua@gmail.com',
			adminLoginPassword = '123abc456',
			userLoginUsername = 'user.ua@gmail.com',
			userLoginPassword = 'kxdm2122',
			errorMessage = 'You entered an invalid username or password. Please, try again.';

		if ((email !== adminLoginUsername || password !== adminLoginPassword) 
		&& (email !== userLoginUsername || password !== userLoginPassword)) {
			this.setState({
				authenticationError: errorMessage
			});
		} else {
			this.props.login({
				username: email,
				isAdmin: email === adminLoginUsername
			});

			this.props.history.push("/");
			return true;
		}
	}

  	render () {
    const { email, password, formErrors, authenticationError } = this.state;
    
		return (
			<form className="login-form" onSubmit={this.onSubmit}>

				<h2> Please Sign In </h2>
				<div className="panel panel-default">
					<div className="error-block-id" style={{ color: 'red' }}>{authenticationError}</div>
				</div>

				<div className="form-group">
					<label htmlFor="email"> Email address </label>
					<input
						name="email"
						className={`form-control ${this.errorClass(formErrors.email)}`}
						required 
						placeholder="Email"
						value={email}
						onChange={this.handleInputChange} />
						
					<span style={{ color: 'red' }}>{formErrors.email}</span>
				</div>

				<div className="form-group">
					<label htmlFor="password"> Password </label>
					<input
						type="password"
						name="password"
						className={`form-control ${this.errorClass(formErrors.password)}`}
						required
						placeholder="Password"
						value={password}
						onChange={this.handleInputChange} />

					<span style={{ color: 'red' }}>{formErrors.password}</span>
				</div>

				<button type="submit" className="btn btn-primary">Sign in</button>
			</form>
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