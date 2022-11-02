import { Button } from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SurveyResultsButton = ({ onViewAnswerClick }) => {
	return (
		<>
			<Button
				size='large'
				color='primary'
				onClick={onViewAnswerClick}
				startIcon={<VisibilityIcon />}
			> 
				View Answers
			</Button>
		</>
	);
};

export { SurveyResultsButton };