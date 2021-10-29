import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				user
					? <Component {...props} /> // Show the component only when the user is logged in
					: <Redirect // Otherwise, redirect the user to /login page
						to={{
							pathname: '/login',
							state: {
								from: props.location
							}
						}}
					/>
			}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user
	};
}

export default connect(mapStateToProps)(PrivateRoute);