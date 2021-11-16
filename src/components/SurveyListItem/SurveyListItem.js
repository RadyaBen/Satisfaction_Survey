import React from 'react';
import SurveyItemButtons from '../SurveyItemButtons';

const SurveyListItem = ({ item, id, showDeleteButton, onSurveyRemoveClick, onViewSurveyClick }) => {
	return (
		<React.Fragment>
			<tr className='element'>
				<td>{id}</td>
				<td>{item.title}</td>
				<td>{item.createDate}</td>
				<td>{item.createdBy}</td>
				<td>
					<SurveyItemButtons
						showDeleteButton={showDeleteButton}
						onSurveyRemoveClick={onSurveyRemoveClick}
						onViewSurveyClick={onViewSurveyClick} />
				</td>
			</tr>
		</React.Fragment>
	);
}

export default SurveyListItem;
