import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../redux/actions/authentication';

import './Header.css';

const Header = () => {
	const isLoggedIn = useSelector(state => !!state.authentication.user);
	const isAdmin = useSelector(state =>
		state.authentication.user && state.authentication.user.isAdmin
	);
	const dispatch = useDispatch();

	return (
		<div className="header">
			<h3 className="header-title">
				<Link to='/'>
					Satisfaction Survey
				</Link>
			</h3>
			<ul className="header-list">
				{isLoggedIn &&
					<li>
						<Link to='/'>Survey List</Link>
					</li>
				}
				{isAdmin &&
					<li>
						<Link to='/createSurvey'>Create Survey</Link>
					</li>
				}
				{isAdmin &&
					<li>
						<Link to='/surveyResults'>Survey Results</Link>
					</li>
				}
				{isLoggedIn &&
					<li>
						<Link to='/login' onClick={() => dispatch(logout())}>Logout</Link>
					</li>
				}
			</ul>
		</div>
	);
};

export default Header;