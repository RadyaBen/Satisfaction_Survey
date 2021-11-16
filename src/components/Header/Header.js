import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../redux/actions/authentication';
import './Header.css';

const Header = ({ isUserLoggedIn, isUserAdmin, logout }) => {
    return (
        <div className="header">
            <h3 className="header-title">
                <Link to='/'>
                    Satisfaction Survey
                </Link>
            </h3>
            <ul className="header-list">
                { isUserLoggedIn &&
                    <li>
                        <Link to='/'>Survey List</Link>
                    </li>
                }
                 { isUserAdmin &&
                    <li>
                        <Link to='/createSurvey'>Create Survey</Link>
                    </li>
                }
                 { isUserAdmin &&
                    <li>
                        <Link to='/surveyResults'>Survey Results</Link>
                    </li>
                }
                { isUserLoggedIn &&
                    <li>
                        <Link to='/login' onClick={logout}>Logout</Link>
                    </li>
                }
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
	return {
		isUserLoggedIn: !!state.authentication.user,
        isUserAdmin: state.authentication.user && state.authentication.user.isAdmin
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logout()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);