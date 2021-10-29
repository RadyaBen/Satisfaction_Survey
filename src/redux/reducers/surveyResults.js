import { SAVE_SURVEY_RESULT_SUCCESS } from "./../actionTypes/surveyResults";
import { getListFromLocalStorage } from "../helpers/utils";
import { SURVEY_RESULTS_KEY } from "./../../constants/localStorageKeys";

const initialState = {
	results: getListFromLocalStorage(SURVEY_RESULTS_KEY)
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_SURVEY_RESULT_SUCCESS:
			return {
				...state,
				results: action.payload
			}
		default:
			return state;
	}
}

export default reducer;