import React from 'react';

import SurveyItemButtons from '../SurveyItemButtons';

import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";

const SurveyListItem = ({ item, id, showDeleteButton, onSurveyRemoveClick, onViewSurveyClick }) => {
	
	const TableCell = withStyles({
		root: {
			borderRight: "none",
			borderLeft: "none",
			fontSize: 14
		}
	})(MuiTableCell);
	
	return (
		<>
			<TableRow className='element'>
				<TableCell component="th" scope="row" align="center">{id}</TableCell>
				<TableCell align="center">{item.title}</TableCell>
				<TableCell align="center">{item.createDate}</TableCell>
				<TableCell align="center">{item.createdBy}</TableCell>
				<TableCell align="center">
					<SurveyItemButtons
						showDeleteButton={showDeleteButton}
						onSurveyRemoveClick={onSurveyRemoveClick}
						onViewSurveyClick={onViewSurveyClick} />
				</TableCell>
			</TableRow>
		</>
	);
}

export default SurveyListItem;