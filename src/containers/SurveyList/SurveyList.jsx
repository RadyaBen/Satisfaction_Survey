import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { SurveyListItem } from '../../components/ui/SurveyListItem';
import { deleteSurvey } from '../../redux/actions/surveyList';

import { useStyles } from './styles';

const SurveyList = () => {
	const { surveyList } = useSelector(state => state.surveyList);
	const { isAdmin } = useSelector(state => state.authentication.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const classes = useStyles();

	const handleDeleteSurvey = (item) => {
		const isConfirmed = window.confirm('Are you sure you want to delete it?');
		if (isConfirmed) {
			dispatch(deleteSurvey(item));
		} else {
			alert("Ok, we won't delete it :)");
		}
	};

	const redirectToSurveyPage = (item) => {
		navigate(`/survey/${item.id}`);
	};

	const renderSurveyListElements = () => {
		const list = surveyList.filter((item) => item.isPublished).map((item, index) => {
			const key = Math.random().toString(36).substr(2, 9);
			return (
				<SurveyListItem
					key={key}
					id={'Q' + (index + 1)}
					item={item}
					showDeleteButton={isAdmin}
					onSurveyRemoveClick={() => handleDeleteSurvey(item)}
					onViewSurveyClick={() => redirectToSurveyPage(item)}
				/>
			)
		});
		return list;
	};

	return (
		<>
			<TableContainer className={classes.root} component={Paper} >
				<Table className={classes.table}>
					<TableHead className={classes.tableHead}>
						<TableRow>
							<TableCell className={classes.tableCell} width='8%'>ID</TableCell>
							<TableCell className={classes.tableCell} width='32%'>TITLE</TableCell>
							<TableCell className={classes.tableCell} width='20%'>CREATE DATE</TableCell>
							<TableCell className={classes.tableCell} width='20%'>CREATED BY</TableCell>
							<TableCell className={classes.tableCell} width='20%'>ACTIONS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{surveyList.length > 0 ? (
							renderSurveyListElements()
						) : (
							<SurveyEmptyMessage message={'No Survey In List Yet'} />
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default SurveyList;