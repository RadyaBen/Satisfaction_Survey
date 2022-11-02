import { TableCell, TableRow } from "@material-ui/core";

import { SurveyResultsButton } from '../ui/SurveyResultsButton';

import { useStyles } from './styles';

const SurveyResultsItem = ({ id, username, createDate, onViewAnswerClick }) => {
	const classes = useStyles();

	return (
		<>
			<TableRow>
				<TableCell className={classes.root}>{id}</TableCell>
				<TableCell className={`${classes.root} ${classes.tableCell}`}>{username}</TableCell>
				<TableCell className={classes.root}>{createDate}</TableCell>
				<TableCell className={classes.root}>
					<SurveyResultsButton onViewAnswerClick={onViewAnswerClick} />
				</TableCell>
			</TableRow>
		</>
	);
};

export { SurveyResultsItem };