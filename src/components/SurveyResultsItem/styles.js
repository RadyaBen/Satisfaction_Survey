import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		borderRight: 'none',
		borderLeft: 'none',
		fontSize: 14,
		textAlign: "center",
	},
	tableCell: {
		maxWidth: "0",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
});

export { useStyles };