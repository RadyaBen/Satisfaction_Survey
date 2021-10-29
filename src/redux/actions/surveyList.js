import { ADD_SURVEY_SUCCESS, REMOVE_SURVEY_SUCCESS } from "./../actionTypes/surveyList";
import { SURVEY_LIST_KEY } from "./../../constants/localStorageKeys";
import { getListFromLocalStorage } from "../helpers/utils";

const addSurveySuccess = (survey) => {
	return {
		type: ADD_SURVEY_SUCCESS,
		payload: survey
	};
};

const deleteSurveySuccess = (survey) => {
	return {
		type: REMOVE_SURVEY_SUCCESS,
		payload: survey
	};
};

const addSurvey = (survey) => {
	return (dispatch) => {
		const surveyList = getListFromLocalStorage(SURVEY_LIST_KEY); 
		surveyList.push(survey);
		localStorage.setItem(SURVEY_LIST_KEY, JSON.stringify(surveyList));

		dispatch(addSurveySuccess(surveyList));
	};
}

const deleteSurvey = (survey) => {
	return (dispatch) => {
		const surveyList = getListFromLocalStorage(SURVEY_LIST_KEY); 
		const surveyIdx = surveyList.indexOf(survey);
	
		surveyList.splice(surveyIdx, 1);
		localStorage.setItem(SURVEY_LIST_KEY, JSON.stringify(surveyList));

		dispatch(deleteSurveySuccess(surveyList));
	};
}

export {
	addSurvey,
	addSurveySuccess,
	deleteSurvey,
	deleteSurveySuccess
};