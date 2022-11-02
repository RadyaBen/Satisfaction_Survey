import { useSelector } from 'react-redux';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';

import { SurveyEmptyMessage } from '../../components/ui/SurveyEmptyMessage';
import { SurveyResultsItem } from '../../components/SurveyResultsItem';

import { useStyles } from './styles';

const SurveyResults = ({ history }) => {
	const { results } = useSelector(state => state.surveyResults);

	const classes = useStyles();

	const redirectToAnswersPage = (item) => {
		history.push(`/surveyAnswers/${item.surveyId}`);
	};

	const createSurveyResults = () => {
		const resultsTable = results.map((item, index) => {
			const key = Math.random().toString(36).substr(2, 9);
			return (
				<SurveyResultsItem
					key={key}
					id={'Q' + (index + 1)}
					username={item.username}
					createDate={item.createDate}
					onViewAnswerClick={() => redirectToAnswersPage(item)}
				/>
			);
		});
		return resultsTable;
	};

	return (
		<TableContainer className={classes.root} component={Paper} >
			<Table className={classes.table}>
				<TableHead className={classes.tableHead}>
					<TableRow>
						<TableCell className={classes.tableCell} width='10%'>ID</TableCell>
						<TableCell className={classes.tableCell} width='40%'>USERNAME</TableCell>
						<TableCell className={classes.tableCell} width='25%'>DATE</TableCell>
						<TableCell className={classes.tableCell} width='25%'>ACTION</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{results.length > 0 ? (
						createSurveyResults()
					) : (
						<SurveyEmptyMessage message={'No Survey Results Yet'} />
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export { SurveyResults };