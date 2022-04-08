import { combineReducers } from 'redux';
import { authentication, surveyList, surveyResults } from '../reducers';

const rootReducer = combineReducers({
	authentication,
	surveyList,
	surveyResults
});

export default rootReducer;