import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoutes = ({
	user,
	redirectPath = '/login',
}) => {
	return (
		user
			? <Outlet />
			: <Navigate
				to={redirectPath}
				replace
			/>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.authentication.user
	};
}

export default connect(mapStateToProps)(PrivateRoutes);