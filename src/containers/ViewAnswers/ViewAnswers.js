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

import { useStyles } from './styles';

const ViewAnswers = () => {
	const [questionsAnswersList, setQuestionsAnswersList] = useState([]);

	const { results } = useSelector(state => state.surveyResults);

	const navigate = useNavigate();
	const { id } = useParams();

	const classes = useStyles();

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
				<Box className={classes.container}>
					<Grid container spacing={3}>
						{questionsAnswersList?.answers?.map(itemList => (
							<Grid
								key={itemList.id}
								className={classes.item}
								xs={12} sm={6} md={4} lg={4} xl={4}
								item
							>
								<Paper className={classes.paper} elevation={4}>
									<Typography className={classes.textTitle} component={'div'}>
										Question:
										<Typography className={classes.text}>
											{itemList.question.question}
										</Typography>
									</Typography>
									<Typography className={classes.textTitle} component={'div'}>
										Answer:
										<Typography className={classes.text}>
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
					className={classes.button}
					onClick={redirectToSurveyResults}
					startIcon={<ArrowBackIcon />}
				>
					Back to survey results
				</Button>
			</Box>
		</>
	);
};

export default ViewAnswers;