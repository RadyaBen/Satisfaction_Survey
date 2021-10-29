import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSurvey } from '../../redux/actions/surveyList';

import './CreateSurvey.css';

class CreateSurvey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPublished: false,
			title: null,
			question: '',
			questionList: [],
			createdBy: null,
			formErrors: '',
			questionError: ''
		};
	}

	handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	handleIsPublishedCheckbox = (e) => {
		this.setState({
			isPublished: e.target.checked
		});
	}

	isCreateFormValid = () => {
		const { title, questionList } = this.state;
		const errorTitleMessage = "Please, enter a title which doesn't empty and has less than 6 characters.";//TODO move all validation messages from all the project to constatnts
		const errorQuestionsMessage = "Please, add at least 2 questions to create this survey.";

		if (!title || title.length < 6) {
			this.setState({
				formErrors: errorTitleMessage
			});
			return false;
		} else if(!questionList || questionList.length < 2) {
			this.setState({
				formErrors: errorQuestionsMessage
			});
			return false;
		} else {
			this.setState({
				formErrors: ''
			});
			return true;
		}
	}

	isSurveyQuestionValid = () => {
		const { question } = this.state;
		const errorQuestionMessage = "Please, enter a question which doesn't empty and has less than 10 characters";
		if (!question || question.length < 10) {
			this.setState({
				questionError: errorQuestionMessage,
			});
			return false;
		} else {
			this.setState({
				questionError: ''
			});
			return true;
		}
	}

	addQuestion = () => {
		if(!this.isSurveyQuestionValid())
			return;

		const { question, questionList } = this.state;
		const key = Math.random().toString(36).substr(2, 10);

		this.setState({
			questionList: [...questionList, { id: key, question }],
			question: ''
		});
	}

	renderQuestionList = () => {
		const list =  this.state.questionList
			.map((item) => {
				return (
					<ul key={item.id}>
						<li>
							{item.question}
						</li>
					</ul>
				)
			});
		return list;
	}

	createSurvey = () => {
		if(!this.isCreateFormValid())
			return;

		const { title, createdBy, isPublished, questionList } = this.state;

		this.props.addSurvey({
			id: Math.random().toString(36).substr(2, 10),
			title,
			createdBy,
			questionList,
			isPublished,
			createDate: new Date().toUTCString()
		});
		this.redirectToSurveyPage();
	}

	redirectToSurveyPage = () => {
		this.props.history.push("/");
	}

	render() {
		const { title, createdBy, isPublished, question, formErrors, questionError } = this.state;

		return (
			<div className='main'>
				<div className="error-block-id" style={{ color: "red" }}>{ formErrors }</div>

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
								value={title}
								style={{ width: "300px" }}
								onChange={this.handleInputChange} />

							<div className="checkbox">
								<label>
									<input
										type="checkbox"
										name="isPublished"
										checked={isPublished}
										onChange={this.handleIsPublishedCheckbox}
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
								value={question}
								style={{ width: "300px" }}
								onChange={this.handleInputChange} />
							<div className="error-block-id" style={{ color: "red" }}>{questionError}</div>
						</div>
						<div>
							<button
								type="button"
								className="btn btn-primary"
								onClick={this.addQuestion}
							> +
							</button>
						</div>
					</div>
					<div>
						{this.renderQuestionList()}
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
								value={createdBy}
								style={{ width: "300px" }}
								onChange={this.handleInputChange} />
						</div>
					</div>
					<div className="right-buttons">
						<button
							type="button"
							className="btn btn-light button-margin"
							onClick={() => this.redirectToSurveyPage()}
						> Cancel
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => this.createSurvey()}
						> Create Survey
						</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		surveyList: state.surveyList.surveyList
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addSurvey: (survey) => dispatch(addSurvey(survey))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);