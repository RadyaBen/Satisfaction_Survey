import React from 'react';
import SurveyResultsButton from '../SurveyResultsButton';

const SurveyResultsItem = ({ id, username, createDate, onViewAnswerClick }) => {
	return (
		<React.Fragment>
			<tr className='element'>
				<td>{id}</td>
				<td>{username}</td>
				<td>{createDate}</td>
				<td>
					<SurveyResultsButton onViewAnswerClick={onViewAnswerClick} />
				</td>
			</tr>
		</React.Fragment>
	);
}

export default SurveyResultsItem;