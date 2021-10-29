import React from 'react';

const SurveyResultsButton = ({ onViewAnswerClick }) => {
	return (
		<React.Fragment>
			<button
				className='btn btn-primary button-1'
				onClick={onViewAnswerClick}
			> View Answers
			</button>
		</React.Fragment>
	);
}

export default SurveyResultsButton;