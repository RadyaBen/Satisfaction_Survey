import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		width: '80%',
		margin: "auto",
		marginTop: "16px",
	},
	table: {
		border: "1px solid #ddd",
	},
	tableHead: {
		backgroundColor: "#9fa8da",
	},
	tableCell: {
		border: "1px solid #ddd",
		fontSize: 15,
		textAlign: "center",
	},
});

export { useStyles };