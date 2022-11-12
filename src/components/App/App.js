import React from 'react';
import { Container } from 'reactstrap';
import PrivateRoutes from '../PrivateRoutes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../Header';
import Login from '../../containers/Login';
import CreateSurvey from '../../containers/CreateSurvey';
import SurveyList from '../../containers/SurveyList';
import Survey from '../../containers/Survey';
import { SurveyResults } from '../../containers/SurveyResults';
import ViewAnswers from '../../containers/ViewAnswers';

const App = () => {
	return (
		<Router>
			<div className='app'>
				<Container>
					<Header />
				</Container>
				<Container>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route element={<PrivateRoutes />}>
							<Route path='/' element={<SurveyList />} />
							<Route path='/createSurvey/' element={<CreateSurvey />} />
							<Route path='/survey/:id' element={<Survey />} />
							<Route path='/surveyResults/' element={<SurveyResults />} />
							<Route path='/surveyAnswers/:id' element={<ViewAnswers />} />
						</Route>
						<Route path='*' element={<h1 style={{ color: 'red', textAlign: 'center' }}>The page wasn't found - 404</h1>} />
					</Routes>
				</Container>
			</div>
		</Router>
	);
}

export default App;