import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addSurvey } from '../../redux/actions/surveyList';

import './CreateSurvey.css';

const CreateSurvey = () => {
	const [inputValues, setInputValues] = useState({ title: '', question: '', createdBy: '' });
	const [isPublished, setIsPublished] = useState(false);
	const [questionList, setQuestionList] = useState([]);
	const [formErrors, setFormErrors] = useState('');
	const [questionError, setQuestionError] = useState('');

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputValues({
			...inputValues,
			[name]: value
		});
	}

	const handleIsPublishedCheckbox = (e) => {
		setIsPublished({ isPublished: e.target.checked });
	}

	const isCreateFormValid = () => {
		const errorTitleMessage = "Please, enter a title which doesn't empty and has less than 6 characters.";
		const errorQuestionsMessage = "Please, add at least 2 questions to create this survey.";

		if (!inputValues.title || inputValues.title.length < 6) {
			setFormErrors(errorTitleMessage);
			return false;
		} else if (!questionList || questionList.length < 2) {
			setFormErrors(errorQuestionsMessage);
			return false;
		} else {
			setFormErrors('');
			return true;
		}
	}

	const isSurveyQuestionValid = () => {
		const errorQuestionMessage = "Please, enter a question which doesn't empty and has less than 10 characters.";
		if (!inputValues.question || inputValues.question.length < 10) {
			setQuestionError(errorQuestionMessage);
			return false;
		} else if (questionList.length >= 1) {
			setFormErrors('');
			return true;
		} else {
			setQuestionError('');
			return true;
		}
	}

	const addQuestion = () => {
		if (!isSurveyQuestionValid())
			return;

		const key = Math.random().toString(36).substr(2, 10);

		setQuestionList([
			...questionList, {
				id: key,
				question: inputValues.question
			}
		]);

		setInputValues({
			...inputValues,
			question: ''
		});
	}

	const renderQuestionList = () => {
		const list = questionList.map((item) => {
			return (
				<ul key={item.id}>
					<li >
						{item.question}
					</li>
				</ul>
			)
		})
		return list;
	}

	const createSurvey = () => {
		if (!isCreateFormValid())
			return;

		dispatch(addSurvey({
			id: Math.random().toString(36).substr(2, 10),
			title: inputValues.title,
			createdBy: inputValues.createdBy,
			questionList,
			isPublished,
			createDate: new Date().toLocaleDateString()
		}));
		redirectToSurveyPage();
	}

	const redirectToSurveyPage = () => {
		navigate("/");
	}

	return (
		<div className='main'>
			<div className="error-block-id" style={{ color: "red" }}>{formErrors}</div>

			<form method="post">
				<div className="field">
					<div>
						<label className="title" htmlFor="form-control">Survey Title</label>
					</div>
					<div>
						<input
							type="text"
							name="title"
							className="form-control"
							maxLength="100"
							placeholder="Enter title"
							value={inputValues.title}
							style={{ width: "300px" }}
							onChange={handleInputChange} />

						<div className="checkbox">
							<label>
								<input
									type="checkbox"
									name="isPublished"
									checked={isPublished}
									onChange={handleIsPublishedCheckbox}
								/> Is Published
							</label>
						</div>
					</div>
				</div>
				<div className="field">
					<div>
						<label className="question" htmlFor="form-control">Question</label>
					</div>
					<div>
						<input
							type="text"
							name="question"
							className="form-control"
							maxLength="100"
							placeholder="Enter question"
							value={inputValues.question}
							style={{ width: "300px" }}
							onChange={handleInputChange} />
						<div className="error-block-id" style={{ color: "red" }}>{questionError}</div>
					</div>
					<div>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => addQuestion()}
						> +
						</button>
					</div>
				</div>
				<div>
					{renderQuestionList()}
				</div>
				<div className="field">
					<div><label className="username" htmlFor="form-control">Your name</label></div>
					<div>
						<input
							type="text"
							name="createdBy"
							className="form-control"
							maxLength="100"
							placeholder="Enter your name"
							value={inputValues.createdBy}
							style={{ width: "300px" }}
							onChange={handleInputChange} />
					</div>
				</div>
				<div className="right-buttons">
					<button
						type="button"
						className="btn btn-light button-margin"
						onClick={() => redirectToSurveyPage()}
					> Cancel
					</button>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => createSurvey()}
					> Create Survey
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateSurvey;