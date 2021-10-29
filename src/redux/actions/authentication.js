import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./../actionTypes/authentication";
import { USER_KEY } from "./../../constants/localStorageKeys";

const loginSuccess = (user) => {
	return {
		type: LOGIN_SUCCESS,
		payload: user
	};
};

const logoutSuccess = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};

const login = (user) => {
    return (dispatch) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
		dispatch(loginSuccess(user));
    };
}

const logout = () => {
	return (dispatch) => {
		localStorage.removeItem(USER_KEY);
		dispatch(logoutSuccess());
	};
}

export {
	login,
	loginSuccess,
	logout,
	logoutSuccess
}