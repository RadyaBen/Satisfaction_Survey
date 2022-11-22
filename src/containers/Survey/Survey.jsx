import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { saveSurveyResult } from '../../redux/actions/surveyResults';

const Survey = () => {
	const [formError, setFormError] = useState('');
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);

	const { surveyList } = useSelector(state => state.surveyList);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (questions.length > 0 || !surveyList)
			return;

		const survey = surveyList.find((survey) => survey.id === id);
		const answers = survey.questionList.map((question) => {
			return {
				id: question.id,
				question,
				answer: null,
			}
		});

		setQuestions(survey.questionList.map((question) => question));
		setAnswers(answers);
	}, [surveyList, id, questions.length]);

	const handleAnswerChange = ({ target }, index) => {
		const { value } = target;

		const copiedAnswers = answers;
		copiedAnswers[index].answer = value;

		setAnswers(copiedAnswers);
	};

	const isAllAnswersValid = () => {
		if (answers.filter(a => !a.answer).length > 0) {
			setFormError("Please, answer all questions.");
			return false;
		} else {
			setFormError('');
			return true;
		}
	};

	const saveAnswers = () => {
		if (!isAllAnswersValid())
			return;

		const list = surveyList;
		const keys = Object.keys(list);
		
		for (const key of keys) {
			dispatch(saveSurveyResult({
				surveyId: id,
				answers: answers,
				username: list[key].createdBy,
				createDate: list[key].createDate,
			}));
		}

		alert('Thank you for your time.');
		navigate('/');
	};

	return (
		<div>
			{formError && (<div style={{ 'color': 'red' }}>{formError}</div>)}
			<div>
				{questions.map((item, index) => (
					<div key={index}>
						<div>
							<label>
								Question: {item.question}
							</label>
						</div>
						<div>
							<label>
								Your Answer:
							</label>
							<input
								type="text"
								name="answer"
								className="form-control"
								placeholder="Your Answer"
								onChange={(e) => handleAnswerChange(e, index)}
								style={{ width: '300px' }}
							/>
						</div>
					</div>
				))}
			</div>
			<button
				className="btn btn-primary"
				onClick={() => saveAnswers()}
			>
				Save Answers
			</button>
		</div>
	);
};

export default Survey;