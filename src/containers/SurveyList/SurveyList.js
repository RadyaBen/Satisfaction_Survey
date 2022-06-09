import React from 'react';
import { connect } from 'react-redux';

import SurveyListItem from '../../components/SurveyListItem';
import { deleteSurvey } from '../../redux/actions/surveyList';

import {
	makeStyles,
	TableContainer,
	TableBody,
	TableRow,
	Paper,
	Table,
	TableHead,
	TableCell
} from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		border: "1px solid #ddd"
	},
	tableHead: {
		backgroundColor: "#9FA8DA"
	},
	tableCell: {
		border: "1px solid #ddd",
		fontSize: 15,
		textAlign: "center"
	}
});

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

	const classes = useStyles();

	return (
		<>
			<TableContainer style={{ margin: "16px 0px" }} component={Paper} >
				<Table className={classes.table}>
					<TableHead className={classes.tableHead}>
						<TableRow>
							<TableCell className={classes.tableCell}>ID</TableCell>
							<TableCell className={classes.tableCell}>TITLE</TableCell>
							<TableCell className={classes.tableCell}>CREATE DATE</TableCell>
							<TableCell className={classes.tableCell}>CREATED BY</TableCell>
							<TableCell className={classes.tableCell}>ACTIONS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{renderSurveyListElements()}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
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