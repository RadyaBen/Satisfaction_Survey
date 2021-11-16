import React from 'react';
import SurveyListItem from '../../components/SurveyListItem'; 
import { Table } from "react-bootstrap";
import { connect } from 'react-redux';
import { deleteSurvey } from '../../redux/actions/surveyList';

import './SurveyList.css';

const SurveyList = ({ isUserAdmin, surveyList, deleteSurvey, history }) => {

	const handleDeleteSurvey = (item) => {
		const isConfirmed = window.confirm('Are you sure you want to delete it?');
		if (isConfirmed) {
			deleteSurvey(item);
		} else {
			alert("Ok, we won't delete it :)");
		}
	}

	const redirectToSurveyPage = (item) => {
		history.push(`/survey/${item.id}`);
	}

	const renderSurveyListElements = () => {
		const list = surveyList.filter((item) => item.isPublished).map((item, index) => {
			const key = Math.random().toString(36).substr(2, 9);
			return (
				<SurveyListItem
					key={key}
					id={'Q' + (index + 1)}
					item={item}
					showDeleteButton={isUserAdmin}
					onSurveyRemoveClick={() => handleDeleteSurvey(item)}
					onViewSurveyClick={() => redirectToSurveyPage(item)}
				/>
			)
		});
		return list;
	}

	return (
		<div className='styled-table'>
			<h1>Survey List</h1>
			<Table striped bordered hover>
				<thead className='thead'>
					<tr>
						<th>ID</th>
						<th>TITLE</th>
						<th>CREATE DATE</th>
						<th>CREATED BY</th>
						<th>ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{renderSurveyListElements()}
				</tbody>
			</Table>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		surveyList: state.surveyList.surveyList,
		isUserAdmin: state.authentication.user.isAdmin
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteSurvey: (item) => {
			dispatch(deleteSurvey(item))
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);