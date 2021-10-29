import React from 'react';

const SurveyItemButtons = ({ showDeleteButton, onSurveyRemoveClick, onViewSurveyClick }) => {
	return (
		<React.Fragment>
			{showDeleteButton &&
				<button
					className='btn btn-primary button-1'
					onClick={onSurveyRemoveClick}
				> Remove
				</button>
			}
			<button
				className='btn btn-primary button-2'
				onClick={onViewSurveyClick}
			> View Survey
			</button>
		</React.Fragment>
	);
}

export default SurveyItemButtons;