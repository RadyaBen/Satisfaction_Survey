import { TableCell, TableRow } from "@material-ui/core";

import { SurveyItemButtons } from '../SurveyItemButtons';

import { useStyles } from './styles';

const SurveyListItem = ({ item, id, showDeleteButton, onSurveyRemoveClick, onViewSurveyClick }) => {
	const classes = useStyles();

	return (
		<>
			<TableRow className='element'>
				<TableCell className={classes.root}>{id}</TableCell>
				<TableCell className={`${classes.root} ${classes.tableCell}`}>{item.title}</TableCell>
				<TableCell className={classes.root}>{item.createDate}</TableCell>
				<TableCell className={`${classes.root} ${classes.tableCell}`}>{item.createdBy}</TableCell>
				<TableCell className={classes.root}>
					<SurveyItemButtons
						showDeleteButton={showDeleteButton}
						onSurveyRemoveClick={onSurveyRemoveClick}
						onViewSurveyClick={onViewSurveyClick} />
				</TableCell>
			</TableRow>
		</>
	);
};

export { SurveyListItem };