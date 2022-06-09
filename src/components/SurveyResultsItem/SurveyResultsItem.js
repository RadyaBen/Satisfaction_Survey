import React from 'react';

import SurveyResultsButton from '../SurveyResultsButton';

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const SurveyResultsItem = ({ id, username, createDate, onViewAnswerClick }) => {

	return (
		<>
			<TableRow className='element'>
				<TableCell>{id}</TableCell>
				<TableCell>{username}</TableCell>
				<TableCell>{createDate}</TableCell>
				<TableCell>
					<SurveyResultsButton onViewAnswerClick={onViewAnswerClick} />
				</TableCell>
			</TableRow>
		</>
	);
}

export default SurveyResultsItem;