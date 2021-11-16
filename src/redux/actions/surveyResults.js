import { SAVE_SURVEY_RESULT_SUCCESS } from "./../actionTypes/surveyResults";
import { SURVEY_RESULTS_KEY } from "./../../constants/localStorageKeys";
import { getListFromLocalStorage } from "../helpers/utils";

const saveSurveyResultSuccess = (surveyResult) => {
	return {
		type: SAVE_SURVEY_RESULT_SUCCESS,
		payload: surveyResult
	};
};

const saveSurveyResult = (data) => {

	return (dispatch) => {
		const surveyResults = getListFromLocalStorage(SURVEY_RESULTS_KEY);
		surveyResults.push(data);
		localStorage.setItem(SURVEY_RESULTS_KEY, JSON.stringify(surveyResults));

		dispatch(saveSurveyResultSuccess(surveyResults));
	};

}

export { 
	saveSurveyResultSuccess, 
	saveSurveyResult 
};