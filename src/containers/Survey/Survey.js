import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveSurveyResult } from '../../redux/actions/surveyResults';

const Survey = ({ surveyList, saveSurveyResult, history, match }) => {

	const [formError, setFormError] = useState('');
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		if (questions.length > 0 || !surveyList)
			return;

		const surveyId = match.params.id;
		const survey = surveyList.find((survey) => survey.id === surveyId);
		const answers = survey.questionList.map((question) => {
			return {
				surveyId: surveyId,
				id: question.id,
				question,
				answer: null,
			}
		});

		setQuestions(survey.questionList.map((question) => question));
		setAnswers(answers);
	}, [surveyList, match.params.id, questions.length]);

	const handleAnswerChange = (e, index) => {
		const { value } = e.target;

		const copiedAnswers = answers;
		copiedAnswers[index].answer = value;

		setAnswers(copiedAnswers);
	}

	const isAllAnswersValid = () => {
		if (answers.filter(a => !a.answer).length > 0) {
			setFormError("Please, answer all questions.");
			return false;
		} else {
			setFormError('');
			return true;
		}
	}

	const saveAnswers = () => {
		if (!isAllAnswersValid())
			return;

		const list = surveyList;
		const keys = Object.keys(list);
		for (const key of keys) {
			saveSurveyResult({
				answers: answers,
				username: list[key].createdBy,
				createDate: list[key].createDate
			});
		}

		alert('Thank you for your time.');
		history.push('/');
	}

	return (
		<div>
			{ formError && (<div style={{ 'color': 'red' }}>{ formError }</div>) }
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
			> Save Answers
			</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		surveyList: state.surveyList.surveyList,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveSurveyResult: (data) => dispatch(saveSurveyResult(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);