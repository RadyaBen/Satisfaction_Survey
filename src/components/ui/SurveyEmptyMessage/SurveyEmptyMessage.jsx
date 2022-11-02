import { TableCell, TableRow } from '@material-ui/core';

const SurveyEmptyMessage = ({ message }) => {
	return (
		<TableRow>
			<TableCell
				colSpan={5}
				style={{
					fontSize: "1.3em",
					height: '70px',
					textAlign: "center"
				}}
			>
				{message}
			</TableCell>
		</TableRow>
	);
};

export { SurveyEmptyMessage };