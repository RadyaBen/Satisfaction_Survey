import { ADD_SURVEY_SUCCESS, REMOVE_SURVEY_SUCCESS } from "./../actionTypes/surveyList";
import { getListFromLocalStorage } from "../helpers/utils";
import { SURVEY_LIST_KEY } from "./../../constants/localStorageKeys";

const initialState = {
	surveyList: getListFromLocalStorage(SURVEY_LIST_KEY)
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_SURVEY_SUCCESS:
			return {
				...state,
				surveyList: action.payload
			}
		case REMOVE_SURVEY_SUCCESS:
			return {
				...state,
				surveyList: action.payload
			}
		default:
			return state;
	}
}

export default reducer;