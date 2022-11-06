import { Button } from '@material-ui/core';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SurveyItemButtons = ({ showDeleteButton, onSurveyRemoveClick, onViewSurveyClick }) => {
	return (
		<>
			{showDeleteButton &&
				<Button
					size='large'
					color='secondary'
					onClick={onSurveyRemoveClick}
					startIcon={<DeleteOutlineIcon />}
				>
					Remove
				</Button>
			}
			<Button
				size='large'
				color='primary'
				onClick={onViewSurveyClick}
				startIcon={<VisibilityIcon />}
			>
				View
			</Button>
		</>
	);
};

export { SurveyItemButtons };