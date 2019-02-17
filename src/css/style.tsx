import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => createStyles({
	root: {
    margin: '60px 0px 10px 0px',
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	button: {
		margin: theme.spacing.unit
	},
  grow: {
    flexGrow: 1
  }
});

export default styles

