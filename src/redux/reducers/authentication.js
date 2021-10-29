import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./../actionTypes/authentication";
import { USER_KEY } from "./../../constants/localStorageKeys";

// This init will be replaced with server logic
const initialState = {
	user: JSON.parse(localStorage.getItem(USER_KEY))
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload
			}
		case LOGOUT_SUCCESS:		
			return {
				...state,
				user: null
			}
		default:
			return state
	}
}

export default reducer;