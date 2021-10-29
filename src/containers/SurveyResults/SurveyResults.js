import React, { Component } from 'react';
import SurveyResultsItem from '../../components/SurveyResultsItem';
import { connect } from 'react-redux';
import { Table } from "react-bootstrap";

import './SurveyResults.css';

class SurveyResults extends Component {

	redirectToAnswersPage = (item) => {
		this.props.history.push(`/surveyAnswers/${item.surveyId}`);
	}

	createSurveyResults = () => {
		const resultsTable = this.props.surveyResults.map((item, index) => {
			const key = Math.random().toString(36).substr(2, 9);
			return (
				<SurveyResultsItem
					key={key}
					id={'Q' + (index + 1)}
					username={item.username}
					createDate={item.createDate}
					onViewAnswerClick={() => this.redirectToAnswersPage(item)}
				/>
			)
		});
		return resultsTable;
	}

	render() {
		return (
			<div className='styled-table'>
				<h1>Survey results</h1>
				<Table striped bordered hover>
					<thead className='thead'>
						<tr>
							<th>SURVEY ID</th>
							<th>USERNAME</th>
							<th>DATE</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{this.createSurveyResults()}
					</tbody>
				</Table>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		surveyResults: state.surveyResults.results
	};
}

export default connect(mapStateToProps)(SurveyResults);