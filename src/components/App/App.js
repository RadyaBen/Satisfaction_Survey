import React from 'react';
import { Container } from 'reactstrap';
import PrivateRoute from '../PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Login from '../../containers/Login';
import CreateSurvey from '../../containers/CreateSurvey';
import SurveyList from '../../containers/SurveyList';
import Survey from '../../containers/Survey';
import SurveyResults from '../../containers/SurveyResults';
import ViewAnswers from '../../containers/ViewAnswers';

const App = () => {
	return (
		<Router>
			<div className='app'>
				<Container>
					<Header />
				</Container>
				<Container>
					<Switch>
						<PrivateRoute path='/' exact component={SurveyList} />
						<Route path='/login' exact component={Login} />
						<PrivateRoute path='/createSurvey/' exact component={CreateSurvey} />
						<PrivateRoute path='/survey/:id' exact component={Survey} />
						<PrivateRoute path='/surveyResults/' exact component={SurveyResults} />
						<PrivateRoute path='/surveyAnswers/:id' exact component={ViewAnswers} />
						<Route render={() => <h1 style={{ color: 'red', textAlign: 'center' }}>The page wasn't found - 404</h1>} />
					</Switch>
				</Container>
			</div>
		</Router>
	);
}

export default App;
	