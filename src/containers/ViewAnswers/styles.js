import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(2),
		margin: theme.spacing(2, 0),
		flexGrow: 1,
		background: '#9ba6e7',
	},
	paper: {
		padding: theme.spacing(0.5),
		wordWrap: 'break-word',
		'&:hover': {
			backgroundColor: '#eaeafe',
		},
	},
	textTitle: {
		fontWeight: theme.typography.fontWeightBold,
		fontSize: '10pt',
		letterSpacing: '0.1px',
	},
	text: {
		fontSize: '10pt',
		letterSpacing: '0.1px',
	},
	button: {
		marginTop: theme.spacing(2),
		borderRadius: theme.spacing(1),
		backgroundColor: '#fff',
	},
}));

export { useStyles };