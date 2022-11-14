import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ redirectPath = '/login' }) => {
	const { user } = useSelector(state => state.authentication);

	return (
		user
			? <Outlet />
			: <Navigate
				to={redirectPath}
				replace
			/>
	);
};

export default PrivateRoutes;