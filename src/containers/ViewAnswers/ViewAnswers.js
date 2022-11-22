import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Box,
	Button,
	Grid,
	Paper,
	Typography
} from '@material-ui/core';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewAnswers = () => {
	const [questionsAnswersList, setQuestionsAnswersList] = useState([]);

	const { results } = useSelector(state => state.surveyResults);

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const surveyResult = results.find(surveyResult => surveyResult.surveyId === id);
		setQuestionsAnswersList(surveyResult);
		// eslint-disable-next-line
	}, [id]);

	const redirectToSurveyResults = () => {
		navigate('/surveyResults');
	};

	return (
		<>
			<Paper elevation={10}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={3}>
						{questionsAnswersList?.answers?.map(itemList => (
							<Grid
								key={itemList.id}
								item
								xs={12} sm={6} md={4} lg={4} xl={4}
							>
								<Paper elevation={3}>
									<Typography component={'div'}>
										Question:
									<Typography>
											{itemList.question.question}
										</Typography>
									</Typography>
									<Typography component={'div'}>
										Answer:
									<Typography>
											{itemList.answer}
										</Typography>
									</Typography>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Box>
			</Paper>
			<Box>
				<Button
					size='large'
					color='primary'
					variant='outlined'
					startIcon={<ArrowBackIcon />}
					onClick={redirectToSurveyResults}
				>
					Back to survey results
				</Button>
			</Box>
		</>
	);
};

export default ViewAnswers;